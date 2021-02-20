import React from 'react';
import styles from './index.less';
import { Map } from 'react-amap';

export default () => {
  let center = { longitude: 120.779058, latitude: 31.112472 }
  let mapEl = null
  let geocoder = null

  // update2
  // issue1

  let setFitView = () => {
    if (mapEl) {
      mapEl.setFitView(null, false, [50, 50, 50, 50]);
    }
  }

  let events = {
    created: (instance: any) => {
      mapEl = instance;
      // 注释2
      console.log(mapEl)
      window.AMap.plugin(['AMap.Geocoder', 'AMap.Driving'], () => {
        let driving = new AMap.Driving({
          map: instance,
          autoFitView: true,
          hideMarkers: true,
          // city: 'beijing'
        });
        console.log(driving)
        driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), (status, result) => {
          console.log(status, result)
        });
      });
      setFitView();
    },
  }
  return (
    <div className={styles.map_wrap}>
      <Map
        protocol={''}
        center={center}
        events={events}
        resizeEnable
        zoomEnable
        scrollWheel
        amapkey="c53e5ec85c4f079c21576c15f0c534cc"
        mapStyle="amap://styles/12cbbdd12bf53731ed580cfc1f1b8b32"
        // version="1.4.10"
      >
      </Map>
    </div>
  );
}
