# 话滑块（Slider）

## 示例
### 基本形式
``` html
<div style="width: 100px;position: relative;">
    <u-slider value="20"></u-slider>
</div>
```

## 案例
### 方法参数
```vue
<template>
<div style="width: 100px;position: relative;">
    <u-slider :value.sync="value" tooltip :step="step" min="10" max="500"></u-slider>
</div>
</template>
<script>
export default {
   data() {
    return {
        value: 20,
        step: 10,
    }
   },
   watch: {
    value(newValue) {
        console.log(newValue);
    },
   },
};
</script>
```
