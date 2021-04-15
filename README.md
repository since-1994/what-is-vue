### 설치

`$yarn global add @vue/cli`
vue-cli를 이용하는 것은 마치 React CRA라고 생각해도 됩니다.

### 프로젝트 생성

`$vue create <프로젝트 명>`

### vue-router

vue에서 공식적으로 제공하는 router
`$yarn add vue-router`

#### router.js

router.js라는 파일명을 가진 파일을 생성해줍니다.

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import 컴포넌트1 from "";
import 컴포넌트2 from "";

//VueRouter를 Vue에서 사용하기 위해서 아래와 같이 명시적으로 나타내주어야 한다.
Vue.use(VueRouter);

const router = VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: 컴포넌트1,
    },
    {
      path: "/about",
      component: 컴포넌트2,
    },
  ],
});

export default router;
```

#### main.js

main.js에서 router를 import 한 후 Vue에 객체 property로 router를 전달해줍니다.

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

#### App.vue

아래 template에서 `router-view`태그로 감싸진 부분이 현재 path에 따라 다른 component를 보여주게 됩니다.

```vue
<template>
  <Header />
  <router-view></router-view>
</templat>
```

### component 생성

파일 확장자를 vue로 생성한다. <컴포넌트명>.vue

```vue
<template>
  <!--현재 컴포넌트의 template 부분-->
</template>
<script>
import 다른 컴포넌트 from '';

export default {
  name: "컴포넌트명",
  components: {
    //해당 컴포넌트 구성에 포함되는 compoent들
    //물론 import가 되어야 한다.
  },
};
</script>
<style>
/* 스타일링 코드가 위치하는 부분 */
</style>
```

### data 컨트롤 하기

data method를 정의해서 데이터를 넘겨줄 수 있으며 이 데이터는 중괄호 두개를 이용해서 template안에서 사용할 수 있습니다.

#### data 출력

```vue
<template>
  <div>
    <h1>Hello this is {{ name }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "minseok",
    };
  },
};
</script>
```

#### data 입력

vue에서는 value값을 binding 받기 위해 v-model attribute를 아래와 같이 사용합니다. 그리고 재미있는 점은 2-way binding입니다. 즉 우리가 v-model을 통해 데이터를 전달하고 전달된 데이터를 사용자가 변경하면 그 값이 또 바로 반영된다는 것입니다.

```vue
<template>
  <div>
    <span>what's your name?</span>
    <input type="text" v-model="name" />
    <h1>hello {{ name }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "minseok",
      name: "",
    };
  },
};
</script>
```

<img src="./img/img1.webp">

#### event 처리

vue에서 event listener를 달아줄 때 @가 붙은 attribute를 사용해주게 됩니다. 예시에서는 button에 click event listener를 달아주도록 하겠습니다.
콜백 함수 같은 경우에는 methods라는 property를 통해서 전달하게 됩니다. getName이라는 콜백함수를 추가해주도록 하겠습니다.

```vue
<template>
  <div>
    <span>what's your name?</span>
    <input type="text" v-model="name" />
    <button @click="getName">Get</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    getName() {
      alert(this.name);
    },
  },
};
</script>
```

### 컴포넌트의 life cycle

1. beforeCreate
2. created
3. beforeMount
   component가 DOM에 추가되기 직전에 실행
4. mounted
   component가 DOM에 추가된 직후에 실행
5. beforeUpdate
   component의 data가 변경되어 re-rendering되기 직전에 실행
6. updated
   component의 data가 변경되어 re-rendering된 직후에 실행
7. beforeDestroy
   component가 내려가기 직전에 실행
8. destroyed
   component가 내려간 직후에 실행

```vue
<template></template>
<script>
export default {
  data() {},
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>
```

### watch

watch라는 property에 전달되는 객체에 data명과 동일한 method를 추가하면 해당 data가 변경될 때 해당 method가 실행되게 됩니다.
아래 같은 경우에는 input에 의해 name 값이 변경되면 콘솔창에 값이 찍히게 됩니다.

```vue
<template>
  <div>
    <span>what's your name?</span>
    <input type="text" v-model="name" />
    <button @click="getName">Get</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  watch: {
    name() {
      console.log(this.name);
    },
  },
};
</script>
```

### data가 배열이나 객체인 경우

- v-for
  value값을 binding하기 위해 v-model을 사용한 것처럼 배열의 값을 통해 element를 생성해주기 위해 v-for를 사용할 수 있습니다. v-for를 통해 받아온 변수는 자식 엘리먼트에서도 사용이 가능합니다.
- :key
  v-for를 통해 생성된 동일한 태그명을 갖는 element를 구분하기 위해 :key attribute에 key값을 전달해줍니다. 콜론이 붙은 attribute에서 v-for를 통해 받아온 변수를 사용할 수 있습니다.

```vue
<template>
  <div>
    <span>what's your name?</span>
    <input type="text" v-model="name" />
    <button @click="getName">Get</button>
    <select v-model="region">
      <option
        :key="idx"
        :value="data.nick_name"
        v-for="(data, idx) in locations"
      >
        {{ data.name }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      locations: [
        {
          name: Seoul,
          nick_name: s,
        },
        {
          name: Jeju,
          nick_name: jj,
        },
      ],
    };
  },
  watch: {
    name() {
      console.log(this.name);
    },
  },
};
</script>
```

### boolean data 활용하기

- v-if
  v-if attribute에 전달되는 data가 true인 경우에만 해당 element를 보여주게 됩니다.
- v-show
  v-if와 유사하나 화면에 렌더링은 합니다. 만약에 boolean값이 자주 변경되는 경우에는 v-show가 성능면에서 유리하게 됩니다.
