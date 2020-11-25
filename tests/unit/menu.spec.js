import {mount} from "@vue/test-utils";
import Menu from "@/components/Menu.vue";
import {RouterLinkStub} from "@vue/test-utils";

describe("Menu.vue", () => {
    it("check toggle menu", () => {
        const wrapper = mount(Menu, {
            data: function() {
                return {
                    showMenu: true,
                };
            },
            stubs: {
                RouterLink: RouterLinkStub,
            }
        });
        expect(wrapper.vm.showMenu===true).toBeTruthy();
    });
    it("check change menu, show", () => {
        const wrapper = mount(Menu, {
            data: function() {
                return {
                    showMenu: false,
                };
            },
            stubs: {
                RouterLink: RouterLinkStub,
            }
        });
        const showMenu = wrapper.find("svg");
        showMenu.trigger("click");
        expect(wrapper.vm.showMenu===true).toBeTruthy();
    });
    it("check change menu, hide", () => {
        const wrapper = mount(Menu, {
            data: function() {
                return {
                    showMenu: true,
                };
            },
            stubs: {
                RouterLink: RouterLinkStub,
            }
        });
        const hideMenu = wrapper.find("svg");
        hideMenu.trigger("click");
        expect(wrapper.vm.showMenu===false).toBeTruthy();
    });
    it("check change theme, to dark", () => {
        const wrapper = mount(Menu, {
            data: function() {
                return {
                    showMenu: true,
                    themeDark:false,
                };
            },
            stubs: {
                RouterLink: RouterLinkStub,
            }
        });
        const switchTheme = wrapper.find("#check");
        switchTheme.trigger("click");
        expect(wrapper.vm.themeDark===true).toBeTruthy();
    });
    it("check change theme, to light", () => {
        const wrapper = mount(Menu, {
            data: function() {
                return {
                    showMenu: true,
                    themeDark:true,
                };
            },
            stubs: {
                RouterLink: RouterLinkStub,
            }
        });
        const switchTheme = wrapper.find("#check");
        switchTheme.trigger("click");
        expect(wrapper.vm.themeDark===false).toBeTruthy();
    });
});
