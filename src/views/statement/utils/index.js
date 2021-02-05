
import { find } from 'lodash'

export const addClass = (el, cls) => {
  if (!el) return;
  let curClass = el.className;
  let classes = (cls || '').split(' ');
  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export const getUuid = () => {
	let random = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	return (random() + random() + "-" + random() + "-" + random() + "-" + random() + "-" + random() + random() + random())
};

export const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export const removeClass = (el, cls) => {
  if (!el || !cls) return;
  let classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';
  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = window.trim(curClass);
  }
}

export const hasAttrInObj = (obj, key, value ) => {
  return !!find(obj, {[key]: value})
}
