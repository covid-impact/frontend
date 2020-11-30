# Search

Search bar for location and stock

## Events

<!-- @vuese:Search:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|stockChange|Fired when user selects a stock|an object containig stock info|
|countryChange|Fired when user selects a country|an object with name and ISO codes for the country|

<!-- @vuese:Search:events:end -->


## Methods

<!-- @vuese:Search:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|li|formatted data to displayed in the suggestions list|-|
|inputChange|to get the suggestions when user enters new characters.|-|
|searchStock|sets the stock data from the suggestions|-|
|searchLocation|sets the country data from the suggestions|-|
|setlocalStorageValue|to store data to local storage|-|
|pressSearchButton|select top suggestions on button click|-|
|searchClick|select suggestions that user clicked|-|
|debounce|when searching wait for user input change for 250ms|-|

<!-- @vuese:Search:methods:end -->


