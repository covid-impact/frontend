# Home

Home for the website

## Props

<!-- @vuese:Home:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|theme|The theme for the page|`String`|`false`|light|
|country|The current country that user wants to view|`Object`|`false`|{"code":"CA","code3":"CAN","name":"Canada","number":"124"}|

<!-- @vuese:Home:props:end -->


## Methods

<!-- @vuese:Home:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|zip|Zips two given arrays into a two dimensional array.|array to zip array to zip|
|checkAuthStatus|Check if the user is logged in.|-|
|addToFav|Add the current country to favorites.|-|
|checkFav|Checks if the current country is already in favorites.|-|
|getData|Gets the historical covid data for the user selected country.|-|
|countryChange|Changes the country to the user selection.|an object with name and ISO codes for the country|
|getConutryData|Gets the current data for selected country|-|

<!-- @vuese:Home:methods:end -->


