<template>
  <main class="">
    <SubNavigation :text="page.title" class="bg-sunshine-100" />
    <!--  -->
    <SvgHeader
      :title="page.header.title"
      :subtitle="page.header.subtitle"
      width="800"
      top="-110"
      svg-name="hilfestellung"
      :swap-heading-element="true"
    />
    <!---->
    <section class="pt-24 pb-24 md:pt-32 md:pb-40 bg-teal-800 relative">
      <div class="container">
        <div class="flex flex-col justify-center items-center mb-24">
          <div class="text-center max-w-2xl flex flex-col items-center">
            <AnimateOnScroll>
              <h2
                class="
                  font-bold
                  text-gray-100 text-2xl
                  md:text-3xl
                  mb-3
                  leading-tight
                "
              >
                {{ page.stakes.title }}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll :delay="1">
              <p class="text-base md:text-lg text-gray-100 max-w-lg">
                {{ page.stakes.subtitle }}
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        <div class="grid gap-y-16 md:gap-y-8 md:grid-cols-3 gap-8 mb-20">
          <AnimateOnScroll
            v-for="(proposition, index) in page.valuePropositions"
            :key="index"
            :delay="index"
          >
            <div>
              <h3 class="text-xl md:text-2xl text-gray-100 font-bold mb-2">
                {{ proposition.title }}
              </h3>
              <p class="text-base md:text-lg text-gray-200">
                {{ proposition.text }}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
        <div class="grid lg:grid-cols-3 gap-4 md:gap-8">
          <div>
            <AnimateOnScroll>
              <h2 class="text-3xl text-gray-100 font-bold">
                {{ page.form.title }}
              </h2>
            </AnimateOnScroll>
          </div>
          <div class="lg:col-span-2">
            <AnimateOnScroll :delay="1">
              <div class="bg-sunshine-200 px-2 py-3 md:px-8 md:py-5 rounded-lg">
                <LeadGeneratorForm :download="page.form">
                  <TealButton :submit="true" :text="page.form.button" />
                </LeadGeneratorForm>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
    <!---->
    <NewFooter
      bg-color="bg-teal-900"
      text-color="text-white"
      link-color="text-sunshine-200"
      hover-color="text-sunshine-300"
      :invert-logo="true"
    />
    <!---->
  </main>
</template>
<script>
import SubNavigation from "@/components/SubNavigation.vue";
import NewFooter from "@/components/NewFooter.vue";
import TealButton from "@/components/TealButton.vue";
import LeadGeneratorForm from "@/components/LeadGeneratorForm.vue";
import MetaTags from "@/mixins/MetaTags.js";
import SvgHeader from "@/components/SvgHeader.vue";
import AnimateOnScroll from "@/components/AnimateOnScroll.vue";
export default {
  components: {
    AnimateOnScroll,
    SvgHeader,
    LeadGeneratorForm,
    TealButton,
    NewFooter,
    SubNavigation,
  },
  mixins: [MetaTags],
  layout: "new",
  async asyncData({ $content }) {
    const page = await $content("page/leadGenerator").fetch();

    return {
      page,
    };
  },
  computed: {},
  mounted() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page-view-lead-generator" });
  },
};
</script>
