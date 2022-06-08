import { useEffect, useState } from 'react';
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';
import Marker from '../components/Marker';
import Robot from '../components/Robot';
import { getMap } from '../data/map';
import { getProductLocations } from '../data/products';
import { getRobotLiveLocations, getRobotLocations } from '../data/robots';
import useItemsInView from '../hooks/items-in-view';
import useRenderedDimensions from '../hooks/rendered-dimensions';
import useWindowResize from '../hooks/window-resize';
import { Location, RobotLocation } from '../types/location';
import { Viewport } from '../types/viewport';

const initialViewport: Viewport = {
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  scale: 1,
};

export default function App() {
  const [zoomPanPinchRef, setZoomPanPinchRef] =
    useState<ReactZoomPanPinchRef>();

  // get map data from server
  const [mapImage, setMapImage] = useState<string>();
  const [intrinsicDimensions, setIntrinsicDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  useEffect(() => {
    getMap().then((map) => {
      setMapImage(map.img);
      setIntrinsicDimensions({
        width: map.width,
        height: map.height,
      });
    });
  }, []);

  // set viewport positions
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const [windowWidth, windowHeight] = useWindowResize(1);

  // set viewport bounds
  const setBounds = (ref: ReactZoomPanPinchRef) => {
    if (!zoomPanPinchRef) {
      setZoomPanPinchRef(ref);
    }
    ref = ref || zoomPanPinchRef;
    if (!ref) {
      return;
    }

    const state = ref.state;
    setViewport({
      minX: -1 * Math.floor(state.positionX / state.scale),
      minY: -1 * Math.floor(state.positionY / state.scale),
      maxX:
        -1 * Math.floor(state.positionX / state.scale) +
        Math.floor(windowWidth / state.scale),
      maxY:
        -1 * Math.floor(state.positionY / state.scale) +
        Math.floor(windowHeight / state.scale),
      scale: state.scale,
    });
    setShowMarkers(true);
  };

  // actual product location is corresponding to intrinsic dimension
  const [productLocations, setProductLocations] = useState<Location[]>([]);
  const productsInViewport = useItemsInView(
    productLocations,
    intrinsicDimensions,
    viewport
  );
  useEffect(() => {
    getProductLocations().then((locations) => {
      setProductLocations(locations);
    });
  }, []);

  // actual robot location is corresponding to intrinsic dimension
  const [robotLocations, setRobotLocations] = useState<RobotLocation[]>([]);
  const robotsInViewport = useItemsInView(
    robotLocations,
    intrinsicDimensions,
    viewport
  );
  useEffect(() => {
    getRobotLocations().then((locations) => {
      setRobotLocations(locations);
      setInterval(() => {
        const liveLocations = getRobotLiveLocations(locations);
        setRobotLocations(liveLocations);
      }, 1000);
    });
  }, []);

  // hide markers when moving view
  const [showMarkers, setShowMarkers] = useState<boolean>(true);

  const renderedDimensions = useRenderedDimensions(intrinsicDimensions);

  return (
    <div className="overflow-hidden">
      <TransformWrapper
        onInit={(ref) => setBounds(ref)}
        onPanningStart={() => setShowMarkers(false)}
        onZoomStart={() => setShowMarkers(false)}
        onPanningStop={setBounds}
        onZoomStop={setBounds}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              {mapImage &&
                !isNaN(renderedDimensions.width) &&
                !isNaN(renderedDimensions.height) && (
                  <div
                    data-testid="map"
                    style={{
                      background: `url(${mapImage}) 0 0 / cover no-repeat`,
                      width: renderedDimensions.width,
                      height: renderedDimensions.height,
                    }}
                  ></div>
                )}
            </TransformComponent>

            {/* markers */}
            {showMarkers &&
              productsInViewport.map((p, i) => <Marker key={i} location={p} />)}

            {/* robots */}
            {showMarkers &&
              robotsInViewport.map((p, i) => <Robot key={i} location={p} />)}

            {/* viewport dimensions (debug) */}
            {/* <div className="absolute left-2 top-2 bg-gray-50 p-1 border text-xs md:text-sm">
              {JSON.stringify(viewport)}
            </div> */}

            {/* buttons */}
            <div className="absolute left-2 bottom-2 flex">
              <button
                className="right-2 bg-gray-200 py-0.5 px-2 border"
                onClick={() => {
                  setShowMarkers(false);
                  zoomIn();
                  setTimeout(setBounds, 500);
                }}
              >
                +
              </button>
              <button
                className="right-2 bg-gray-200 py-0.5 px-2 border ml-2"
                onClick={() => {
                  setShowMarkers(false);
                  zoomOut();
                  setTimeout(setBounds, 500);
                }}
              >
                -
              </button>
              <button
                className="right-2 bg-gray-200 py-0.5 px-2 border ml-2"
                onClick={() => {
                  setShowMarkers(false);
                  resetTransform();
                  setTimeout(setBounds, 500);
                }}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
