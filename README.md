# Dummy 2D Store Map

Build a 2D store map, showing location of all products and robots.

DEMO: http://2d-store-map.surge.sh

## Libraries used

- React@^17.0.2
- TailwindCSS@^2.2.17
- Typescript@^4.4.4

## Getting started

### `npm install`

Builds dependencies.

### `npm run start`

Compiles and runs project on http://localhost:3000

### `npm run build`

Builds project for static deployment.

### `npm run test`

Runs unit test cases.

## Deploying to the web

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge --project build --domain 2d-store-map.surge.sh --token <SURGE_TOKEN>
```

## Explanation

- I am assuming there will be a large size JPG image for store map. We should also know the intrinsic width and height of the image. We should get this data from API. I have mocked it as a helper function in data/map.ts and used a floor map of a building.
- Products location will be received by an API call, which I have mocked as a helper function in data/products.ts
- Robots location will also be received by an API call, which I have mocked as a helper function in data/robots.ts
- Robots will be moving, so they will have an orientation and speed. To mock that, I have added a `setInterval` to update robots location every second.
- Setting image in the background, I have rendered all products (in green) and robots (in blue) on map.
- I used a library https://github.com/prc5/react-zoom-pan-pinch for zoom, pan and pinch features.
- The app would work on different resolutions. It would first scale down/up the map image to match the device resolution, and then translate the x,y coordinates of all products and robots according to the scale.
- Users can pinch and zoom, pan, double-click on map to zoom in, and the products and robots will be filtered as per the view area.
- For slightly better UX, I have added "Zoom In", "Zoom Out" and "Reset Zoom" buttons.
