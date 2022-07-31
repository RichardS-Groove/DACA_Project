const fetchCoasterData = (...urls) => {
    const promises = urls.map(url => fetch(url).then(response => response.json()))
      return Promise.all(promises)
}
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81'];
    return colors.map(color => opacity ? `${color+opacity}`: color);
}
