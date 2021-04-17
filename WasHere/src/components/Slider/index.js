import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "rn-range-slider";
import dayjs from "dayjs";

import Thumb from "./Thumb";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Label from "./Label";

const SliderScreen = ({ handleValueChange }) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);

  return (
    <View style={styles.root}>
      <Slider
        style={styles.slider}
        min={dayjs().unix() - 86400}
        max={dayjs().unix()}
        step={1800}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "stretch",
    padding: 12,
    flex: 1,
  },
});

export default SliderScreen;
