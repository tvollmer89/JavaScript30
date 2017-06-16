document.addEventListener("DOMContentLoaded", function(event){
  window.addEventListener('keydown', function(e) {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      console.log(e.keyCode);
      console.log(audio);
    });


});
