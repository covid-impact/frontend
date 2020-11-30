# Select

Select component for user to select a country

## Props

<!-- @vuese:Select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|placeholder|placeholder to show|`String`|`true`|-|
|data|data from which to be selected|`Array`|`true`|-|
|default|default selected data|`Object`|`false`|-|

<!-- @vuese:Select:props:end -->


## Events

<!-- @vuese:Select:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|newSelection|Fired when user selects a country|an object with name and ISO codes for the country|

<!-- @vuese:Select:events:end -->


## Methods

<!-- @vuese:Select:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|changeSelection|Selects the country the user clicked on.Fires the `countryChange` event .|index of the country that is clicked by the user.|
|toggleList|Toggles the lists of options that the user can select.|-|

<!-- @vuese:Select:methods:end -->


