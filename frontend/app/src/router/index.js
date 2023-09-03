import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StoryView from "../views/StoryView.vue";
import StoryBuild from "../views/story/StoryBuild.vue";
import StoryHome from "../views/story/StoryHome.vue";
import StoryPlay from "../views/story/StoryPlay.vue";
const routes = [
{
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/story",
    name: "story",
    component: StoryView,
    children: [
      {
        path: "",
        name: "story-home",
        component: StoryHome,
      },
    ],
  },
  {
    path: "/story/:story_id/build/:board_id?",
    name: "build-story",
    component: StoryBuild,
    meta:{
      watchParam: "board_id"
    }
  },
  {
    path: "/story/play/:story_id",
    name: "play-story",
    component: StoryPlay,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
