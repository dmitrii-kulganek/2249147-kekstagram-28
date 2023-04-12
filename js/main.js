import { renderMiniatures } from './miniatures.js';
import { renderFullPicture } from './full-picture.js';
import { openFormLoadPicture, onFormSubmit, closeFormLoadPicture } from './form-processing-load-picture.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderFilteredMiniatures } from './filters.js';

getData()
  .then((objectsArray) => {
    renderMiniatures(objectsArray);
    renderFullPicture(objectsArray);
    renderFilteredMiniatures(objectsArray);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

openFormLoadPicture();
onFormSubmit(closeFormLoadPicture);
