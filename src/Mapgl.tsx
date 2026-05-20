import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { useMapglContext } from './MapglContext';
import { useControlRotateClockwise } from './useControlRotateClockwise';
import { ControlRotateCounterclockwise } from './ControlRotateConterclockwise';
import { MapWrapper } from './MapWrapper';

import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import geoData from './data/small_data.json';

export const MAP_CENTER = [82.913021, 54.992394];

export default function Mapgl() {
  const { setMapglContext } = useMapglContext();

  useEffect(() => {
    let map: mapgl.Map | undefined = undefined;

    load().then((mapgl) => {
      map = new mapgl.Map('map-container', {
        center: MAP_CENTER,
        zoom: 13,
        key: 'da014549-c5b5-4930-a69d-1e67b2ec7626',
        style: 'a7f8b38b-10c9-4ab0-84c3-614c92c3df53',
      });

      const data: FeatureCollection<Geometry, GeoJsonProperties> =
        geoData as FeatureCollection<Geometry, GeoJsonProperties>;

      const source = new mapgl.GeoJsonSource(map, {
        data,
        attributes: {
          visible: true, // Уникальное свойство
        },
      });

      // const layer1 = {
      //   id: 'dtp-data-layer',
      //   // Тип объекта отрисовки
      //   type: 'point',
      //   // Стиль объекта отрисовки
      //   style: {
      //     iconImage: ['match', ['get', 'color'],
      //     ['blue'], 'ent_i', 'ent'],
      //     iconWidth: 15,
      //     textField: ['get', 'category'],
      //     textFont: ['Noto_Sans'],
      //     textColor: '#0098ea',
      //     textHaloColor: '#fff',
      //     textHaloWidth: 1,
      //     iconPriority: 100,
      //     textPriority: 100,
      //   },
      // };

      // map.on('styleload', () => {
      //   map?.addLayer(layer1);
      // });

      // const layer2: any = {
      //   id: 'dtp-heatmap-layer', 
      //   filter: [
      //     'match',
      //     ['sourceAttr', 'visible'],
      //     [true],
      //     true, // Значение при совпадении атрибута 'purpose' источника со значением 'heatmap'
      //     false, // Значение при несовпадении
      //   ],
      //   // Тип объекта отрисовки
      //   type: 'heatmap',
      //   // Стиль объекта отрисовки
      //   style: {
      //   color: [
      //   'interpolate',
      //   ['linear'],
      //   ['heatmap-density'],
      //   0,
      //   'rgba(0, 0, 0, 0)',
      //   0.2,
      //   '#61589A',
      //   0.4,
      //   '#9A83C9',
      //   0.6,
      //   '#CCB0E4',
      //   0.8,
      //   '#F0E1F5',
      //   1,
      //   'rgba(255, 255, 255, 1)',
      //   ],
      //   radius: 20,
      //   intensity: 0.8,
      //   opacity: 0.8,
      //   downscale: 1,
      //   },
      // };

      // map.on('styleload', () => {
      // map?.addLayer(layer2);
      // });

      setMapglContext({
        mapglInstance: map,
        mapgl,
      });
    });

    // Destroy the map if the Map component is going to be unmounted
    return () => {
      if (map) {
        map.destroy();
      }
      setMapglContext({
        mapglInstance: undefined,
        mapgl: undefined,
      });
    };
  }, [setMapglContext]);

  useControlRotateClockwise();

  return (
    <>
      <MapWrapper />
      <ControlRotateCounterclockwise />
    </>
  );
}