import {shallowMount} from "@vue/test-utils";
import Search from "@/components/Search.vue";
import 'jest-localstorage-mock';


describe("Chart.vue", () => {
    it("check input text", () => {
        const wrapper = shallowMount(Search, {
            data: function() {
                return {
                    searchInput: "US",
                };
            },
        });
        const inputTextBar = wrapper.find("input");
        expect(inputTextBar.element.value).toMatch("US");
    });
    it("check click button", () => {
      /*
        const wrapper = shallowMount(Search, {
            data: function() {
                return {
                    searchInput: "Canada",
                };
            },
        });
        const searchButton = wrapper.find("button");
        //console.log(wrapper);
        //const spy = jest.spyOn(wrapper.methods, "setlocalStorageValue");
        searchButton.trigger("click");
        //expect(spy).toHaveBeenCalled();
        //spy.mockRestore();
        expect(localStorage.setItem).toHaveBeenLastCalledWith("country","Canada");
        */
    });
});
