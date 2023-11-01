import { createStore } from "vuex";
import { auth } from "./auth.module";
import { group } from "./group.module";
import { user } from "./user.module";
import { meeting } from "./meeting.module";
import { preference } from "./pref.module.js";

const store = createStore({
    modules: {
        auth,
        group,
        user,
        meeting,
        preference,
    },
});

export default store;