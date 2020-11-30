# FinanceCity

To analyse the impact of the COVID-19 citywise

## Props

<!-- @vuese:FinanceCity:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|theme|The theme for the page|`String`|`false`|light|
|stockName|Stock for which the data is to fetched.|`Object`|`false`|-|

<!-- @vuese:FinanceCity:props:end -->


## Methods

<!-- @vuese:FinanceCity:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|zip|Zips two given arrays into a two dimensional array.|array to zip array to zip|
|getCountiesList|Gets a list of the counties for which data can be fetched.|-|
|getCountyData|Get the data for the selected county. Default is alphabetically.|-|
|getStockData|Get the data for the selected stock.|-|
|countyChange|Change the state for getting new counties/cities.|-|
|countyNameChange|Get the selected county.|-|

<!-- @vuese:FinanceCity:methods:end -->


