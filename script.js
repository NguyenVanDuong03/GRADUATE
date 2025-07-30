$(document).ready(() => {
  // Declare variables before using them
  const $ = window.$;
  const AOS = window.AOS;
  const particlesJS = window.particlesJS;

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Initialize Particles.js
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#fbbf24" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#fbbf24",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }

  // Sound effects
  let soundEnabled = true;
  const sounds = {
    correct: new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    ),
    incorrect: new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    ),
    click: new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    ),
  };

  // Sound toggle
  $("#soundToggle").click(function () {
    soundEnabled = !soundEnabled;
    $(this).find("i").toggleClass("fa-volume-up fa-volume-mute");
    playSound("click");
  });

  function playSound(type) {
    if (soundEnabled && sounds[type]) {
      sounds[type].currentTime = 0;
      sounds[type].play().catch(() => {});
    }
  }

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800
      );
    }
  });

  // Stats counter animation
  function animateCounter() {
    $(".stat-number").each(function () {
      const $this = $(this);
      const countTo = Number.parseFloat($this.attr("data-count"));
      const isDecimal = countTo % 1 !== 0;

      $({ countNum: 0 }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            if (isDecimal) {
              $this.text(this.countNum.toFixed(1));
            } else {
              $this.text(Math.floor(this.countNum));
            }
          },
          complete: () => {
            if (isDecimal) {
              $this.text(countTo.toFixed(1));
            } else {
              $this.text(countTo);
            }
          },
        }
      );
    });
  }

  // Trigger counter animation when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector(".hero-section");
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Enhanced Quiz System
  const quizData = {
    personal: [
      {
        question: "Màu sắc yêu thích của tôi là gì?",
        answers: ["Xanh dương", "Đỏ", "Vàng", "Xanh lá"],
        correct: 0,
        hint: "Giống như màu của biển cả và tên tôi!",
      },
      {
        question: "Tôi có bao nhiêu anh chị em?",
        answers: ["1", "2", "3", "4"],
        correct: 1,
        hint: "Có đứa em gái xinh lắm luôn!",
      },
      {
        question: "Thức uống yêu thích của tôi?",
        answers: ["Cà phê", "Trà", "Nước cam", "Coca Cola"],
        correct: 0,
        hint: "Thức uống giúp tỉnh táo buổi sáng!",
      },
      {
        question: "Tôi sinh vào tháng nào?",
        answers: ["Tháng 3", "Tháng 6", "Tháng 8", "Tháng 12"],
        correct: 2,
        hint: "Tháng của mùa thu!",
      },
      {
        question: "Tôi thích môn thể thao nào nhất?",
        answers: ["Bóng đá", "Bóng rổ", "Cầu lông", "Bơi lội"],
        correct: 0,
        hint: "Môn thể thao vua, có trái bóng tròn!",
      },
      {
        question: "Tôi chém gió có hay không?",
        answers: ["Có", "Không"],
        correct: 0,
        hint: "Đã chém thì phải hay, không thì thôi:))",
      },
    ],
    study: [
      {
        question: "Chuyên ngành của tôi là gì?",
        answers: ["Kinh tế", "Công nghệ thông tin", "Y khoa", "Luật"],
        correct: 1,
        hint: "Liên quan đến máy tính và lập trình!",
      },
      {
        question: "GPA của tôi là bao nhiêu?",
        answers: ["3.5", "3.8", "4.0", "3.3"],
        correct: 3,
        hint: "Một con số không quá cao nhưng cũng không quá thấp!",
      },
      {
        question: "Ngôn ngữ lập trình đầu tiên tôi học?",
        answers: ["Python", "Java", "C++", "JavaScript"],
        correct: 2,
        hint: "Ngôn ngữ cơ bản, có nhiều con trỏ!",
      },
      {
        question: "Ngôn ngữ tôi thành thạo nhất?",
        answers: ["Java", "JavaScript", "Python", "PHP"],
        correct: 3,
        hint: "Học thầy KTD chẳng thạo vội:))",
      },
    ],
    hobby: [
      {
        question: "Sở thích chính của tôi trong thời gian rảnh?",
        answers: ["Đọc sách", "Chơi game", "Nấu ăn", "Du lịch"],
        correct: 3,
        hint: "Thích tất cả nhưng có tiền là đi du lịch ngay:))",
      },
      {
        question: "Thể loại game tôi yêu thích?",
        answers: ["FPS", "RPG", "Moba", "Racing"],
        correct: 2,
        hint: "Có nhiều tướng, chiến thuật đa dạng!",
      },
      {
        question: "Nhạc cụ tôi biết chơi?",
        answers: ["Piano", "Guitar", "Violin", "Mic"],
        correct: 3,
        hint: "Biết hát thôi chứ biết chơi nhạc cụ gì đâu:))",
      },
      {
        question: "Tôi có bao nhiêu điểm D?",
        answers: ["10", "2", "5", "3"],
        correct: 1,
        hint: "Chỉ có 2 điểm thôi, không nhiều lắm đâu!",
      },
    ],
    future: [
      {
        question: "Công việc mơ ước của tôi?",
        answers: [
          "Software Engineer",
          "Data Scientist",
          "Product Manager",
          "Startup Founder",
        ],
        correct: 3,
        hint: "Tôi muốn tạo ra sản phẩm của riêng mình!",
      },
      {
        question: "Tôi muốn du lịch đến bao nhiêu quốc gia?",
        answers: ["30", "40", "50", "60"],
        correct: 2,
        hint: "Một con số tròn, bằng số tuổi nghỉ hưu lý tưởng!",
      },
      {
        question: "Mục tiêu trong 5 năm tới?",
        answers: [
          "Có nhà riêng",
          "Khởi nghiệp",
          "Trốn NVQS",
          "Tất cả các ý trên",
        ],
        correct: 3,
        hint: "Tại sao phải chọn một khi có thể có tất cả?",
      },
      {
        question: "Tôi muốn học thêm ngôn ngữ nào?",
        answers: ["Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Trung"],
        correct: 3,
        hint: "Học được thì tốt vì bạn gái tôi biết tiếng này=))",
      },
    ],
  };

  let currentCategory = "personal";
  let currentQuestionIndex = 0;
  let score = 0;
  let totalQuestions = 0;
  let streak = 0;
  let maxStreak = 0;
  const usedQuestions = {
    personal: [],
    study: [],
    hobby: [],
    future: [],
  };

  // Initialize quiz
  function initQuiz() {
    loadRandomQuestion();
    updateProgressBar();
  }

  // Category selection
  $(".quiz-categories .btn").click(function () {
    $(".quiz-categories .btn").removeClass("active");
    $(this).addClass("active");
    currentCategory = $(this).data("category");
    loadRandomQuestion();
    playSound("click");
  });

  // Load random question from current category
  function loadRandomQuestion() {
    const categoryQuestions = quizData[currentCategory];
    if (usedQuestions[currentCategory].length === categoryQuestions.length) {
      usedQuestions[currentCategory] = [];
    }

    const availableQuestions = categoryQuestions.filter(
      (_, index) => !usedQuestions[currentCategory].includes(index)
    );

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = categoryQuestions.indexOf(
      availableQuestions[randomIndex]
    );

    usedQuestions[currentCategory].push(questionIndex);
    currentQuestionIndex = questionIndex;

    displayQuestion(categoryQuestions[currentQuestionIndex]);
    totalQuestions++;
    updateScore();
    updateProgressBar();
  }

  // Display question
  function displayQuestion(question) {
    $("#questionText").text(question.question);
    $("#answersContainer").empty();
    $("#nextQuestion").hide();
    $("#hintText").hide();

    question.answers.forEach((answer, index) => {
      $("#answersContainer").append(`
                <div class="col-md-6 mb-2">
                    <button class="answer-btn" data-index="${index}">
                        ${answer}
                    </button>
                </div>
            `);
    });
  }

  // Handle answer click
  $(document).on("click", ".answer-btn", function () {
    const selectedIndex = Number.parseInt($(this).data("index"));
    const correctIndex =
      quizData[currentCategory][currentQuestionIndex].correct;

    $(".answer-btn").prop("disabled", true);

    if (selectedIndex === correctIndex) {
      $(this).addClass("correct");
      showNotification("Đúng rồi! 🎉", "success");
      score++;
      streak++;
      maxStreak = Math.max(maxStreak, streak);
      createConfetti();
      playSound("correct");
    } else {
      $(this).addClass("incorrect");
      $(`.answer-btn[data-index="${correctIndex}"]`).addClass("correct");
      showNotification("Sai rồi! 😅", "error");
      streak = 0;
      playSound("incorrect");
    }

    updateScore();

    setTimeout(() => {
      $("#nextQuestion").show();
    }, 1500);
  });

  // Next question
  $("#nextQuestion").click(() => {
    $(".answer-btn").removeClass("correct incorrect").prop("disabled", false);
    loadRandomQuestion();
    playSound("click");
  });

  // Hint button
  $("#hintBtn").click(function () {
    const hint = quizData[currentCategory][currentQuestionIndex].hint;
    $("#hintText").text(`💡 ${hint}`).slideDown();
    $(this).prop("disabled", true);
    playSound("click");
  });

  // Update score and streak
  function updateScore() {
    $("#score").text(score);
    $("#totalQuestions").text(totalQuestions);
    $("#streak").text(streak);
  }

  // Update progress bar
  function updateProgressBar() {
    const progress =
      (usedQuestions[currentCategory].length /
        quizData[currentCategory].length) *
      100;
    $("#progressBar").css("width", progress + "%");
  }

  // Show notification
  function showNotification(message, type) {
    const notification = $("#notification");
    notification.html(message);
    notification.css("background", type === "success" ? "#10b981" : "#ef4444");
    notification.fadeIn(300);

    setTimeout(() => {
      notification.fadeOut(300);
    }, 1500);
  }

  // Troll button functionality
  let trollAttempts = 0;
  $("#congratsBtn").hover(function () {
    if (trollAttempts < 3) {
      const button = $(this);
      const container = button.parent();
      const containerWidth = container.width();
      const containerHeight = container.height();
      const buttonWidth = button.outerWidth();
      const buttonHeight = button.outerHeight();

      const maxX = Math.max(0, containerWidth - buttonWidth);
      const maxY = Math.max(0, containerHeight - buttonHeight);

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      button.addClass("moving");
      button.css({
        left: newX + "px",
        top: newY + "px",
      });

      trollAttempts++;

      if (trollAttempts === 3) {
        setTimeout(() => {
          button.removeClass("moving");
          button.css({
            position: "relative",
            left: "auto",
            top: "auto",
          });
          button.html('<i class="fas fa-heart me-2"></i>Cảm ơn bạn! 💖');
        }, 1000);
      }
    }
  });

  $("#congratsBtn").click(() => {
    if (trollAttempts >= 3) {
      showNotification("Cảm ơn bạn rất nhiều! 🎓💖", "success");
      createConfetti();
      playSound("correct");
    }
  });

  // Surprise button
  $("#surpriseBtn").click(() => {
    const surprises = [
      "🎉 Bạn đã mở khóa thành tích: Người bạn tuyệt vời!",
      "🌟 Fun fact: Tôi là đứa cười to nhất lớp mà hay ngồi bàn đầu:))",
      "🎵 Bài hát khiến bạn bè tôi thích nghe nhất là 'Đừng làm trái tim anh đau'",
      "🏆 Tôi từng thức xuyên đêm để ôn tập cho bài thi hết môn!",
      "🎮 Môn thể thao tôi thích nhất là bóng đá",
      "📚 Sách tôi mượn từ thư viện trường đếm trên đầu ngón tay",
      "🍕 Tôi luôn ăn chè thái bưởi mỗi nhóm bạn tôi rủ nhau đi ăn chè:))",
      "💡 Tôi khá lười học, may mắn thay tôi có bạn học giỏi giúp đỡ",
      "🎓 Tôi đã tốt nghiệp với điểm số thấp nhất so với nhóm bạn học của tôi:))))",
      "🎈 Tham gia BCH Liên chi đoàn là hoạt động tôi yêu thích nhất!",
    ];

    const randomSurprise =
      surprises[Math.floor(Math.random() * surprises.length)];
    showNotification(randomSurprise, "success");
    createConfetti();
    playSound("correct");
  });

  // Memory Wall functionality
  $("#memoryForm").submit((e) => {
    e.preventDefault();

    const name = $("#guestName").val().trim();
    const message = $("#guestMessage").val().trim();
    const color = $("#messageColor").val();

    if (name && message) {
      addMemoryCard(name, message, color);
      $("#memoryForm")[0].reset();
      showNotification("Cảm ơn lời chúc của bạn! 💖", "success");
      playSound("correct");
    }
  });

  function addMemoryCard(name, message, color) {
    const now = new Date();
    const timeString = now.toLocaleString("vi-VN");

    const memoryCard = $(`
            <div class="memory-card" style="--card-color: ${color}">
                <div class="guest-name">${name}</div>
                <div class="guest-message">${message}</div>
                <div class="memory-date">${timeString}</div>
            </div>
        `);

    memoryCard.hide().appendTo("#memoryWall").fadeIn(500);

    // Save to localStorage
    const memories = JSON.parse(
      localStorage.getItem("graduationMemories") || "[]"
    );
    memories.push({ name, message, color, date: timeString });
    localStorage.setItem("graduationMemories", JSON.stringify(memories));
  }

  // Load saved memories
  function loadMemories() {
    const memories = JSON.parse(
      localStorage.getItem("graduationMemories") || "[]"
    );
    memories.forEach((memory) => {
      const memoryCard = $(`
                <div class="memory-card" style="--card-color: ${memory.color}">
                    <div class="guest-name">${memory.name}</div>
                    <div class="guest-message">${memory.message}</div>
                    <div class="memory-date">${memory.date}</div>
                </div>
            `);
      memoryCard.appendTo("#memoryWall");
    });
  }

  // Gallery modal
  $(".gallery-item").click(function () {
    const imageSrc = $(this).data("image");
    $("#modalImage").attr("src", imageSrc);
  });

  // Create confetti effect
  function createConfetti() {
    const confettiContainer = $("#confetti");
    const colors = [
      "#fbbf24",
      "#10b981",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#f59e0b",
      "#84cc16",
    ];

    for (let i = 0; i < 100; i++) {
      const confettiPiece = $('<div class="confetti-piece"></div>');
      const size = Math.random() * 8 + 4;
      confettiPiece.css({
        left: Math.random() * 100 + "%",
        width: size + "px",
        height: size + "px",
        background: colors[Math.floor(Math.random() * colors.length)],
        "animation-delay": Math.random() * 2 + "s",
        "animation-duration": Math.random() * 2 + 2 + "s",
      });

      confettiContainer.append(confettiPiece);

      setTimeout(() => {
        confettiPiece.remove();
      }, 4000);
    }
  }

  // Random sparkle effects
  setInterval(() => {
    if (Math.random() < 0.3) {
      createSparkle();
    }
  }, 3000);

  function createSparkle() {
    const sparkleIcons = ["fa-star", "fa-sparkles", "fa-gem", "fa-crown"];
    const randomIcon =
      sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];

    const sparkle = $(
      `<i class="fas ${randomIcon}" style="position: fixed; color: #fbbf24; font-size: 1rem; pointer-events: none; z-index: 1000; animation: sparkle-fade 3s ease-out forwards;"></i>`
    );
    sparkle.css({
      left: Math.random() * window.innerWidth + "px",
      top: Math.random() * window.innerHeight + "px",
    });

    $("body").append(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }

  // Easter eggs
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

  $(document).keydown((e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      showNotification("🎮 Bạn đã tìm ra bí mật! 🎮", "success");
      createMegaConfetti();
      konamiCode = [];
    }
  });

  function createMegaConfetti() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createConfetti(), i * 200);
    }
  }

  // Double click easter egg
  let clickCount = 0;
  $(".hero-title").click(() => {
    clickCount++;
    if (clickCount === 5) {
      showNotification(
        "🎓 Bạn đã tìm ra bí mật! Tôi thực sự rất biết ơn bạn! 🎓",
        "success"
      );
      createConfetti();
      clickCount = 0;
    }
    setTimeout(() => {
      clickCount = 0;
    }, 2000);
  });

  // Initialize everything
  initQuiz();
  loadMemories();

  // Add sparkle-fade animation
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
        @keyframes sparkle-fade {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
    `
    )
    .appendTo("head");

  // Navbar scroll effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // Add scrolled class styles
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
        .navbar.scrolled {
            background: rgba(30, 58, 138, 0.95) !important;
            backdrop-filter: blur(15px);
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
    `
    )
    .appendTo("head");

  // Typing effect for hero subtitle
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.text("");
    function type() {
      if (i < text.length) {
        element.text(element.text() + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing effect after a delay
  setTimeout(() => {
    typeWriter($(".hero-subtitle"), "Tôi trân trọng kính mời bạn tham dự", 80);
  }, 1000);

  // Achievement unlock system
  const achievements = {
    quiz_master: {
      name: "Quiz Master",
      description: "Trả lời đúng 10 câu hỏi",
      icon: "🧠",
      unlocked: false,
    },
    streak_king: {
      name: "Streak King",
      description: "Đạt chuỗi 5 câu đúng",
      icon: "🔥",
      unlocked: false,
    },
    explorer: {
      name: "Explorer",
      description: "Thử tất cả danh mục quiz",
      icon: "🗺️",
      unlocked: false,
    },
    memory_keeper: {
      name: "Memory Keeper",
      description: "Để lại lời chúc",
      icon: "💝",
      unlocked: false,
    },
  };

  function checkAchievements() {
    // Quiz Master
    if (score >= 10 && !achievements.quiz_master.unlocked) {
      unlockAchievement("quiz_master");
    }

    // Streak King
    if (streak >= 5 && !achievements.streak_king.unlocked) {
      unlockAchievement("streak_king");
    }

    // Explorer
    const categoriesUsed = Object.keys(usedQuestions).filter(
      (cat) => usedQuestions[cat].length > 0
    );
    if (categoriesUsed.length >= 4 && !achievements.explorer.unlocked) {
      unlockAchievement("explorer");
    }
  }

  function unlockAchievement(achievementId) {
    const achievement = achievements[achievementId];
    achievement.unlocked = true;

    showNotification(
      `🏆 Thành tích mở khóa: ${achievement.icon} ${achievement.name}!<br><small>${achievement.description}</small>`,
      "success"
    );
    createConfetti();
    playSound("correct");
  }

  // Check achievements after each quiz answer
  $(document).on("click", ".answer-btn", () => {
    setTimeout(checkAchievements, 100);
  });

  // Memory keeper achievement
  $("#memoryForm").on("submit", () => {
    if (!achievements.memory_keeper.unlocked) {
      setTimeout(() => unlockAchievement("memory_keeper"), 500);
    }
  });
});
