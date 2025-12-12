// Reorganize publications to separate workshop papers by year
document.addEventListener('DOMContentLoaded', function() {
  const publicationsDiv = document.querySelector('.publications');
  if (!publicationsDiv) return;

  // Get all bibliography sections
  const yearSections = publicationsDiv.querySelectorAll('h2.bibliography');

  yearSections.forEach(function(yearHeader) {
    const year = yearHeader.textContent.trim();
    const yearList = yearHeader.nextElementSibling;

    if (!yearList || !yearList.classList.contains('bibliography')) return;

    // Find all workshop papers in this year
    const workshopPapers = [];

    const listItems = yearList.querySelectorAll('li');
    listItems.forEach(function(li) {
      const paperRow = li.querySelector('.row.workshop-paper');
      if (paperRow) {
        workshopPapers.push(li.cloneNode(true));
        li.remove();
      }
    });

    // If there are workshop papers, create a workshop section
    if (workshopPapers.length > 0) {
      // Create workshop heading
      const workshopHeading = document.createElement('h4');
      workshopHeading.className = 'bibliography-workshop-heading';
      workshopHeading.textContent = 'Workshop Papers';

      // Create workshop list
      const workshopList = document.createElement('ol');
      workshopList.className = 'bibliography workshop-papers';

      // Add workshop papers to the list
      workshopPapers.forEach(function(paper) {
        workshopList.appendChild(paper);
      });

      // Insert after the regular papers list
      yearList.parentNode.insertBefore(workshopHeading, yearList.nextSibling);
      yearList.parentNode.insertBefore(workshopList, workshopHeading.nextSibling);
    }
  });
});