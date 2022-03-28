import { RefObject, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange } from "cesium";

const locationDiv = document.getElementById("location");
const terrainProvider = createWorldTerrain();
const osmBuildings = createOsmBuildings();

const viewer = new Viewer("cesiumContainer", {
    terrainProvider: terrainProvider
});
viewer.imageryLayers.addImageryProvider(
    new IonImageryProvider({ assetId: 3 })
);

// //Set bounds of our simulation time
// const start = JulianDate.fromDate(new Date(2015, 2, 25, 16));
// const stop = JulianDate.addSeconds(start, 360, new JulianDate());

// //Make sure viewer is at the desired time.
// viewer.clock.startTime = start.clone();
// viewer.clock.stopTime = stop.clone();
// viewer.clock.currentTime = start.clone();
// viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
// viewer.clock.multiplier = 10;

const scene = viewer.scene;
scene.primitives.add(osmBuildings);
scene.globe.depthTestAgainstTerrain = true;

scene.camera.setView({
    destination: Cartesian3.fromDegrees(-86.15797, 39.77999, 300),
    orientation: {
        heading: Math.toRadians(20),
        pitch: Math.toRadians(-30),
    },
}); 

osmBuildings.initialTilesLoaded.addEventListener((tiles) => {
    console.log("initial osm buildings loaded", tiles);
});

osmBuildings.allTilesLoaded.addEventListener((tile) => {
    console.log("all osm buildings loaded", tile);
});

osmBuildings.tileLoad.addEventListener((tile: Cesium3DTile) => {
    const content = tile.content;
    const featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
        const name = content.getFeature(i).getProperty("name");
        if (name === "The Landmark Center") {
            const lng = content.getFeature(i).getProperty("cesium#longitude");
            const lat = content.getFeature(i).getProperty("cesium#latitude");
            const alt = parseInt(content.getFeature(i).getProperty("cesium#estimatedHeight"));
            const str = `${lng}:${lat}:${alt}`;
            const ent = viewer.entities.getById(str);
            if (!ent) {
                viewer.entities.add({
                    id: str,
                    position: Cartesian3.fromDegrees(lng, lat, alt + 10),
                    // polyline: {
                    //     show: true,
                    //     positions: [positionEnd, positionStart],
                    //     width: 2,
                    //     arcType: ArcType.NONE,
                    //     material: new PolylineOutlineMaterialProperty({
                    //         color: Color.BLACK,
                    //     }),
                    // },
                    label: {
                        show: true,
                        text: name,
                        font: "14px monospace",
                        fillColor: Color.WHITE,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        heightReference: HeightReference.RELATIVE_TO_GROUND,
                        showBackground: true,
                        backgroundColor: Color.BLACK,
                        translucencyByDistance: new NearFarScalar(1.0e1, 1.0, 3.0e3, 0.0)
                    }
                });
            }
        }
    }
});

osmBuildings.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            ["${feature['building']} === 'apartments' || ${feature['building']} === 'residential'", "color('cyan', 1)",],
            ["${feature['building']} === 'civic'","color('blue', 1)",],
            ["${feature['building']} === 'office'","color('yellow', 1)",],
            ["${feature['building']} === 'commercial' || ${feature['building']} === 'retail'","color('green', 1)",],
            ["${feature['building']} === 'hospital'","color('red', 1)",],
            ["${feature['building']} === 'construction'","color('orange', 1)",],
            ["${feature['building']} === 'school'","color('purple', 1)",],
            ["${feature['building']} === 'parking'","color('pink', 1)",],
            [true, "color('white', 1)"],
        ],
    }
});

// https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
// https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
// https://sandcastle.cesium.com/?src=Interpolation.html

addBasicPoint(-86.157534, 39.781117, 0, "Red Car", Color.RED);
addBasicPoint(-86.157565, 39.782405, 0, "White Truck", Color.WHITE);
addBasicPoint(-86.156474, 39.781180, 0, "Silver Van", Color.SILVER);
addBasicPoint(-86.155948, 39.781284, 0, "Blue SUV", Color.BLUE, Color.WHITE);

viewer.entities.add({
    position: Cartesian3.fromDegrees(-86.157077, 39.781357, 0),
    rectangle: {
        coordinates: Rectangle.fromDegrees(-86.157423, 39.781252, -86.156713, 39.781454), // west lon, south lat, east lon, north lat
        material: Color.WHITE.withAlpha(0.5),
        height: 1,
        extrudedHeight: 2,
        heightReference: HeightReference.RELATIVE_TO_GROUND,
        extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
        outline: true,
        outlineColor: Color.BLACK,
    },
    label: {
        show: true,
        text: "STAGING AREA ALPHA",
        font: "14px monospace",
        fillColor: Color.BLACK,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference: HeightReference.CLAMP_TO_GROUND,
        showBackground: true,
        backgroundColor: Color.WHITE,
        horizontalOrigin: HorizontalOrigin.CENTER,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(0, -30)
    }
});


addBillboard(-86.156500, 39.781500, 0, "../src/img/fire_single.png");
addBillboard(-86.156630, 39.781150, 0, "../src/img/fire_vehicle.png");
addBillboard(-86.157446, 39.783739, 0, "../src/img/police_vehicle.png");
addBillboard(-86.157261, 39.781358, 0, "../src/img/ems_single.png");
addBillboard(-86.156826, 39.781351, 0, "../src/img/ems_single.png");
addBillboard(-86.157542, 39.782290, 0, "../src/img/police_vehicle.png");
addBillboard(-86.157523, 39.782254, 0, "../src/img/police_single.png");

viewer.entities.add({
    id: 'mouse',
    label: {
        show: true,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        font: "14px monospace",
        fillColor: Color.WHITE,
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.75),
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(10, 0)
    }
});

// Mouse over the globe to see the cartographic position
const handler = new ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function onMouseMove(movement) {
    const locationMouse: any = viewer.entities.getById('mouse');
    const cartesian = scene.pickPosition(movement.endPosition)
    if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
        const heightString = Math.toDegrees(cartographic.height).toFixed(2);
        locationMouse.position = cartesian;
		// if (locationDiv) {
		// 	locationDiv.innerHTML = `${longitudeString}, ${latitudeString} | ${heightString}m`;
		// }
        // const feature = scene.pick(movement.endPosition);
        // if (defined(feature)) {
        //     const name = feature.getProperty("name");
        //     if (name) {
        //         locationString = `${name}, ${locationString}`;
        //     }
        // }
        locationMouse.label.show = true;
        locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
    } else {
        locationMouse.label.show = false;
    }
}, ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function onMouseMove(movement) {
    const cartesian = scene.pickPosition(movement.position)
    if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
        console.log(`${longitudeString}, ${latitudeString}`);
    }
}, ScreenSpaceEventType.LEFT_CLICK);


function addBasicPoint(lat: number, lng: number, alt: number = 0, text: string, color = Color.WHITE, outlineColor = Color.BLACK) {

    const basicPoint = {
        pixelSize: 10,
        color: color,
        outlineColor: outlineColor,
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference : HeightReference.CLAMP_TO_GROUND
    };

    // const basicLine = {
    //     positions: Cartesian3.fromDegreesArrayHeights([lng, lat, alt, lng, lat, 50,]),
    //     width: 5,
    //     material: new PolylineOutlineMaterialProperty({
    //         color: color,
    //         outlineWidth: 2,
    //         outlineColor: outlineColor,
    //     }),
    // }

    const basicLabel = {
        show: true,
        font: "14px monospace",
        outlineColor: outlineColor,
        outlineWidth: 20,
        fillColor: outlineColor,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference : HeightReference.RELATIVE_TO_GROUND,
        showBackground: true,
        backgroundColor: color,
        horizontalOrigin: HorizontalOrigin.CENTER,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(7, -30)
    }

    viewer.entities.add({
        position: Cartesian3.fromDegrees(lat, lng, alt),
        point: basicPoint,
        // polyline: basicLine,
        label: {
            ...basicLabel,
            text: text
        }
    });
}

function addBillboard(lat: number, lng: number, alt: number = 0, image: string,) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lat, lng, alt),
        billboard: {
            image: image,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            pixelOffset: new Cartesian2(0, -60)
        },
    });
}

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			{/* <Viewer full terrainProvider={terrainProvider}>
				<Scene>
				</Scene>
				<Globe />
				<Camera>
					<CameraFlyTo 
						destination={position}
						orientation={orientation} /> 
				</Camera>
				<Entity position={position} name="New York">
					<PointGraphics pixelSize={10} />
					<EntityDescription>
						<h1>Hello, world.</h1>
						<p>JSX is available here!</p>
					</EntityDescription>
				</Entity>
			</Viewer> */}
		</div>
	)
}

export default App
