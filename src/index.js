// import _ from 'lodash';

function createComponent(tag) {
  let element = document.createElement(tag);
  let template = [
    'Hello',
    'webpack',
    'Brian',
    'Good!',
    'Ok1111122啥事 !!']
  element.innerHTML = template.join('<br/>')
  return element
}

document.body.append(createComponent('h1'))