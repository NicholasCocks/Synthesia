const tab = document.querySelector('.about_icon')
const about = document.querySelector('.about_tab')
const icon = document.querySelector('.about_icon')

tab.addEventListener('click', () => {
    if (about.classList.contains('inactive')) {
        about.classList.remove('inactive')
        icon.classList.add('active_icon')
    } else {
        about.classList.add('inactive')
        icon.classList.remove('active_icon')
    }
});