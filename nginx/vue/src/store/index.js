import { createStore } from "vuex";
import { auth } from "./auth.module";
import { group } from "./group.module";

const store = createStore({
    modules: {
        auth,
        group,
    },
});

export default store;