import React, { useCallback, useEffect, useState, useRef } from 'react';
import './multiRangeSlider.css';

const MultiRangeSlider = ({ min, max, step, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - step);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={`thumb thumb--zindex-3 ${
          minVal > max - 100 ? 'thumb--zindex-5' : ''
        }
        }`}
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + step);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className='thumb thumb--zindex-4'
      />

      <div className='slider'>
        <div className='slider__track' />
        <div ref={range} className='slider__range' />
      </div>
    </>
  );
};

export default MultiRangeSlider;
