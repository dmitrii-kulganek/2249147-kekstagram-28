import { isEscapeKey } from './util.js';

const AMOUNT_COMMENTS_DEFAULT = 5; // Количество комментариев в порции показа по умолчанию

const mainWindow = document.querySelector('body');
const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureWindow.querySelector('.likes-count');
const bigPictureDescription = bigPictureWindow.querySelector('.social__caption');
const fullPictureOpenElement = document.querySelector('.pictures');
const fullPictureCloseElement = document.querySelector('#picture-cancel');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');

let commentsShow = 0;
let chooseObject = {};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  // -----------------------------------------------------------------------------------------------------------------------------------???
  // Как мы используем функцию до её декларирования, почему это работает??? Точнее как в данном случае уйти от этой ошибки от линтера?
  }
};

const renderComments = (object) => {
  // debugger;
  commentsLoaderButton.classList.remove('hidden');
  commentsShow += AMOUNT_COMMENTS_DEFAULT ;

  if (commentsShow >= object.comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShow = object.comments.length;
  }

  commentsList.innerHTML = '';

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Надо доделать!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1!!!!!!!!!!!!!!!
  // const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShow; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const avatarComment = document.createElement('img');
    avatarComment.classList.add('social__picture');
    avatarComment.src = object.comments[i].avatar;
    avatarComment.alt = object.comments[i].name;
    avatarComment.width = '35';
    avatarComment.height = '35';
    newComment.append(avatarComment);
    const textComment = document.createElement('p');
    textComment.classList.add('social__text');
    textComment.textContent = object.comments[i].message;
    newComment.append(textComment);
    commentsList.append(newComment);
  }

  commentsCounter.innerHTML = `${commentsShow} из <span class="comments-count">3</span> комментариев`;
  // Количество комментариев comments подставьте как текстовое содержание элемента .comments-count
  bigPictureWindow.querySelector('.comments-count').textContent = object.comments.length;
};

const onCommentsLoaderButtonClick = () => renderComments(chooseObject);

const openFullPicture = (evt, dataArray) => {
  bigPictureWindow.classList.remove('hidden');
  commentsShow = 0;
  document.addEventListener('keydown', onDocumentKeydown);

  // После открытия окна добавление тегу <body> класс modal-open,
  // чтобы контейнер с фотографиями позади не прокручивался при скролле.
  // При закрытии окна этот класс удаляется.
  mainWindow.classList.add('modal-open');

  // Поиск элемента массива данных, на картинку которого произошёл клик по дата атрибуту ссылки
  const pictureId = evt.target.closest('.picture').dataset.id;
  chooseObject = dataArray.find((object) => object.id === Number(pictureId));

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img
  bigPictureImage.src = chooseObject.url;
  bigPictureImage.alt = chooseObject.description;
  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count
  bigPictureLikes.textContent = chooseObject.likes;
  // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
  // и добавляться новая порция при нажатии кнопки 'Загрузить ещё'
  renderComments(chooseObject);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

  // Описание фотографии description вставьте строкой в блок .social__caption
  bigPictureDescription.textContent = chooseObject.description;
};

const closeFullPicture = () => {
  bigPictureWindow.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

  // После открытия окна добавление тегу <body> класс modal-open,
  // чтобы контейнер с фотографиями позади не прокручивался при скролле.
  // При закрытии окна этот класс удаляется.
  mainWindow.classList.remove('modal-open');

  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
};

const renderFullPicture = (dataArray) => {
  fullPictureOpenElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openFullPicture (evt, dataArray);
    }
  });

  fullPictureCloseElement.addEventListener('click', () => {
    closeFullPicture ();
  });
};

export { renderFullPicture };
