///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const image = document.querySelector(".image");

let img;
function createImage(imgPath) {
  return new Promise((resolve, reject) => {
    img = document.createElement("img");
    img.src = imgPath;
    img.onload = () => resolve(img);
    img.onerror = () => reject(err);
  });
}

createImage("img/img-1.jpg")
  .then((img) => {
    image.append(img);
    image.classList.add("images");
    return wait(2);
  })
  .then(() => {
    img.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    image.append(img);
    return wait(2);
  })
  .then(() => {
    img.style.display = "none";
    return createImage("img/img-3.jpg");
  })
  .then((img) => {
    image.append(img);
    return wait(2);
  })
  .then(() => (img.style.display = "none"))
  .catch((err) => console.error(err));
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const image = document.querySelector(".image");
async function load(imgPath) {
  try {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", () => {
      image.append(img);
    });
    return img;
  } catch (err) {
    console.error(err);
    throw img.onerror;
  }
}

async function loadNPause(imgArr) {
  image.classList.add("images");
  const imgsPr = imgArr.map(async (img) => await load(`img/img-${img}.jpg`));
  // it is because we are calling async function (callback) three times, which always returns promise.
  // our fullfilled value is set in that promise now.
  // we are getting array of promise, instead of array of fullfilled value of promises.
  // console.log(imgs);

  const imgs = await Promise.all(imgsPr);
  imgs.forEach((img) => {
    img.classList.add("parallel");
  });
  console.log(image);
}

loadNPause([1, 2, 3]);
