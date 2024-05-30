$(document).ready(function() {
  let score = 0;
  let time = 30;
  let gameInterval;
  let moleTimeout;

  function showMole() {
      const randomHole = Math.floor(Math.random() * 9) + 1;

      $('.hole').removeClass('mole');

      $(`.hole[data-id=${randomHole}]`).addClass('mole');

      moleTimeout = setTimeout(() => {
          $(`.hole[data-id=${randomHole}]`).removeClass('mole');
          showMole(); // Show another mole after the timeout
      }, 1000);
  }

  function startGame() {
      score = 0;
      time = 30;
      $('#score').text(score);

      $('#time').text(time);
      
      clearInterval(gameInterval); // Ensure no multiple intervals
      clearTimeout(moleTimeout); // Ensure no leftover moles
      
      gameInterval = setInterval(() => {
          time--;
          $('#time').text(time);

          if (time === 0) {
              clearInterval(gameInterval);
              clearTimeout(moleTimeout);
              $('.hole').removeClass('mole');
              alert(`Game over! Your score is ${score}`);
          }
      }, 1000);

      showMole(); // Start showing moles immediately
  }

  $('.hole').click(function() {
      if ($(this).hasClass('mole')) {
          score++;
          $('#score').text(score);
          $(this).removeClass('mole');
          clearTimeout(moleTimeout); 
          // Clear the current mole timeout
          
          showMole(); // Show a new mole immediately
      }
  });

  $('#startButton').click(function() {
      startGame();
  });
});
