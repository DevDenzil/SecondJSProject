'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      'Логан',
      'Лига справедливости',
      'Ла-ла лэнд',
      'Одержимость',
      'Скотт Пилигрим против...',
    ],
  };

  // 1
  // const adv = document.querySelector('.promo__adv');
  // adv.remove();

  const adv = document.querySelectorAll('.promo__adv img');
  const movieList = document.querySelector('.promo__interactive-list');
  const genre = document.querySelector('.promo__genre');
  const promoBG = document.querySelector('.promo__bg');
  const addForm = document.querySelector('form.add');
  const addInput = addForm.querySelector('.adding__input');
  const checkbox = addForm.querySelector('[type="checkbox"]');

  // 1
  const deleteAdv = (arr) => {
    arr.forEach((item) => item.remove());
  };

  const makeChanges = () => {
    genre.textContent = 'Драма';
    promoBG.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(filmList, parent) {
    parent.innerHTML = '';
    sortArr(filmList);
    filmList.forEach((film, i) => {
      parent.innerHTML += `
  <li class='promo__interactive-item'>${i + 1}. ${film}
  <div class='delete'></div>
  </li>`;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);

        createMovieList(filmList, parent);
      });
    });
  }

  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, movieList);

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 21)}...`;
      }

      if (favorite) {
        console.log('Add favorite movie');
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);

      createMovieList(movieDB.movies, movieList);
    }

    event.target.reset();
  });
});
