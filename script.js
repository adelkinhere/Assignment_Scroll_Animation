document.addEventListener('DOMContentLoaded', function() {
  const teamSection = document.querySelector('.team-members');
  const flyingBees = document.querySelectorAll('.flying-bee');
  const teamMembers = document.querySelectorAll('.team-member');
  const profileImages = document.querySelectorAll('.profile');
  const teamMemberInfos = document.querySelectorAll('.team-member-info');
  
  // initial positions for bees (off-screen)
  const beePositions = [
    { top: '10%', left: '-10%' },  
    { top: '-10%', left: '30%' },  
    { top: '110%', left: '70%' },  
    { top: '50%', left: '110%' }   
  ];
  
  // setting initial positions
  flyingBees.forEach((bee, index) => {
    bee.style.position = 'absolute';
    bee.style.top = beePositions[index].top;
    bee.style.left = beePositions[index].left;
  });

  function updateBeePositions() {
    const scrollProgress = Math.min(1, window.scrollY / (teamSection.offsetTop + teamSection.offsetHeight - window.innerHeight));

    flyingBees.forEach((bee, index) => {
      const memberRect = teamMembers[index].getBoundingClientRect();
      const teamRect = teamSection.getBoundingClientRect();

      // final positions relative to team section
      const finalTop = ((memberRect.top - teamRect.top) + (memberRect.height / 2) - (bee.offsetHeight / 2));
      const finalLeft = ((memberRect.left - teamRect.left) + (memberRect.width / 2) - (bee.offsetWidth / 2));

      // interpolating between start and final positions
      const startTop = parseFloat(beePositions[index].top);
      const startLeft = parseFloat(beePositions[index].left);

      const newTop = startTop + (finalTop - startTop) * scrollProgress;
      const newLeft = startLeft + (finalLeft - startLeft) * scrollProgress;

      bee.style.top = newTop + 'px';
      bee.style.left = newLeft + 'px';
      bee.style.transform = `rotate(${(1 - scrollProgress) * 20 - 10}deg)`;

      // showing the profile image and info when the bee is at its final position
      if (scrollProgress === 1) {
        setTimeout(() => {
          bee.style.opacity = '0'; // fading out bee
          profileImages[index].classList.add('visible'); // showing profile picture
          teamMemberInfos[index].classList.add('visible'); // showing info
        }, 300);
      } else {
        bee.style.opacity = '1'; // keeping bees visible until they finish moving
        profileImages[index].classList.remove('visible'); // hiding profiles when scrolling up
        teamMemberInfos[index].classList.remove('visible'); // hiding info when scrolling up
      }
    });
  }

  window.addEventListener('scroll', updateBeePositions);
  updateBeePositions(); // updating positions immediately in case the section is already in view
});
