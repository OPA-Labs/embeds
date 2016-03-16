import getDimensions from '../dimensions';
import map from 'lodash.map';

const type = 'video';

const getSources = elm => {
  const sourceElms = elm.getElementsByTagName('source');

  if (sourceElms.length) {
    return map(sourceElms, sourceElm => ({
      src: sourceElm.getAttribute('src'),
      type: sourceElm.getAttribute('type') || null
    }));
  }

  return [{
    src: elm.getAttribute('src'),
    type: null
  }];
};

export const parse = ([elm]) => {
  let tagName = elm.tagName.toLowerCase();

  if (tagName === 'figure') {
    elm = elm.getElementsByTagName('video')[0];

    if (!elm) {
      return null;
    }

    tagName = elm.tagName.toLowerCase();
  }

  if (tagName === 'video') {
    const {width, height} = getDimensions(elm);
    const sources = getSources(elm);

    return {
      type, sources, width, height
    };
  }

  return null;
};
