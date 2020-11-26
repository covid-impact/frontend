import {shallowMount, mount} from "@vue/test-utils";
import Search from "@/components/Search.vue";

describe("Search.vue", () => {
    it("check input text", () => {
        const spychangePlaceholderText = jest.fn();

        const wrapper = shallowMount(Search, {
            name: "Search",
            data: function() {
                return {
                    searchInput: "US",
                    suggestionItems: [],
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText
            }
        });
        const inputTextBar = wrapper.find("input");
        expect(inputTextBar.element.value).toMatch("US");
    });
    it("check click button", () => {
        const spychangePlaceholderText = jest.fn();
        const spypressSearchButton = jest.spyOn(Search.methods, "pressSearchButton");
        const mockIncludeFinance = jest.fn(function () {
          return true;
        });
        const wrapper = mount(Search, {
            name: "Search",
            data: function() {
                return {
                    searchInput: "CCL",
                    suggestionItems:[{
                      keywordsSymbol: {},
                      keywordsBoth: "CCL",
                      keywordsName: "CCL",
                      name: "CCL",
                      region: "mockRegion",
                      exchange: "mockExchange"
                    }],
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText,
              routeInclude: mockIncludeFinance,
            },
        });
        const searchButton = wrapper.find("button");
        searchButton.trigger("click");
        expect(spypressSearchButton).toHaveBeenCalled();
        spypressSearchButton.mockReset();
    });
    it("check run finance route", () => {
        const spychangePlaceholderText = jest.fn();
        const wrapper = mount(Search, {
            name: "Search",
            data: function() {
                return {
                    searchInput: "CCL",
                    suggestionItems:[{
                      keywordsSymbol: {},
                      keywordsBoth: "CCL",
                      keywordsName: "CCL",
                      name: "CCL",
                      region: "mockRegion",
                      exchange: "mockExchange"
                    }],
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText,
            },
        });
        wrapper.vm.searchStock(0);
        expect(wrapper.emitted().stockChange).toBeTruthy();
        spychangePlaceholderText.mockReset();
    });
    it("check run covid route", () => {
        const spychangePlaceholderText = jest.fn();
        const wrapper = mount(Search, {
            name: "Search",
            data: function() {
                return {
                    searchInput: "US",
                    suggestionItems:[{
                      keywordsSymbol: {},
                      keywordsBoth: "USA",
                      keywordsName: "USB",
                      name: "USC",
                      region: "",
                      exchange: ""
                    }],
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText,
            },
        });
        wrapper.vm.searchLocation(0);
        expect(wrapper.emitted().countryChange).toBeTruthy();
        spychangePlaceholderText.mockReset();
    });
    it("check empty input", () => {
        const spychangePlaceholderText = jest.fn();
        const wrapper = mount(Search, {
            name: "Search",
            data: function() {
                return {
                    searchInput: "",
                    suggestionItems: [],
                };
            },
            methods: {
              changePlaceholderText: spychangePlaceholderText,
            },
        });

        wrapper.vm.inputChange();
        expect(wrapper.vm.showSuggestion===false).toBeTruthy();
        expect(wrapper.vm.suggestionItems).toEqual([{
          name: "Nothing found",
          code: "404",
        }]);
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
