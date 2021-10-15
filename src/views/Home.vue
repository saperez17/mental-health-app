<template>
  <b-container fluid >
    <b-row>
      <b-col class="p-0">
        <Navbar />
      </b-col>
    </b-row>
    <div >
      <router-view />
    </div>
  </b-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import ContentFeed from "@/components/ContentFeed";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel/index.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    ContentFeed,
    LeftPanel,
    RightPanel,
  },
};
</script>

<style scoped>
.wrapper{
  
}
</style>
