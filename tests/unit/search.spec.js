import {shallowMount, mount, createLocalVue} from "@vue/test-utils";
import Search from "@/components/Search.vue";

describe("Search.vue", () => {
    it("check input text", () => {
        const spychangePlaceholderText = jest.fn();
        const wrapper = shallowMount(Search, {
            data: function() {
                return {
                    searchInput: "US",
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText
            }
        });
        const inputTextBar = wrapper.find("input");
        expect(spychangePlaceholderText).toHaveBeenCalled();
        expect(inputTextBar.element.value).toMatch("US");
    });
    it("check click button with finance", async () => {
        const spychangePlaceholderText = jest.fn();
        const spy1 = jest.spyOn(Search.methods, "pressSearchButton");
        const spy2 = jest.spyOn(Search.methods, "searchStock");
        const spy3 = jest.spyOn(Search.methods, "searchLocation");

        const $route = {
            name: 'finance'
        };
        const wrapper = shallowMount(Search, {
            mocks:{
              $route: $route
            },
            data: function() {
                return {
                    searchInput: "CCL",
                    topFiveSuggestions:[{
                      keywordsSymbol: {},
                      keywordsBoth: "CCL",
                      keywordsName: "CCL",
                    }]
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText
            }
        });
        const spy4 = jest.spyOn(wrapper.vm, "searchLocation");
        const spy5 = jest.spyOn(wrapper.vm, "searchStock");
        const spy6 = jest.spyOn(wrapper.vm, "setlocalStorageValue");
        const searchButton = wrapper.find("button");
        searchButton.trigger("click");
        //wrapper.vm.searchStock(0);

        expect(spy1).toHaveBeenCalled();
        expect(spy5).toHaveBeenCalled();
        expect(wrapper.emitted().stockChange).toBeTruthy();
        spychangePlaceholderText.mockReset();
    });
    /*
    it("check click button with covid", async () => {
        const spychangePlaceholderText = jest.fn();
        const spysearchLocation = jest.spyOn(Search.methods, "searchLocation");
        const $route = {
            name: 'covid'
        };
        const wrapper = shallowMount(Search, {
            mocks:{
              $route
            },
            data: function() {
                return {
                    searchInput: "Canada",
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText
            }
        });
        const searchButton = wrapper.find("button");
        searchButton.trigger("click");
        //expect(spysearchLocation).toHaveBeenCalled();
        expect(wrapper.emitted().countryChange).toBeTruthy();
        spychangePlaceholderText.mockReset();
        spysearchLocation.mockReset();
    });
    */
});
