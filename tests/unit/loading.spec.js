import {shallowMount} from "@vue/test-utils";
import Loading from "@/components/Loading.vue";

describe("Loading.vue", () => {
    it("check boolean full", () => {
        const wrapper = shallowMount(Loading, {
        });

        expect(wrapper.vm.full===false).toBeTruthy();
    });

});
