# diploun
U.S. Diplomacy application


clone the application


run npm install


npm run start


npm run deploy[if deploy to github pages]

Diploun – Diplomacy through interactivity

What is Diploun and how is it related to Diplomacy?

The noun diplomat is related to the word diploma, from the Greek Diploun, meaning “to fold double.” A diploma is an official paper — something diplomats carry on behalf of their governments, so the app gets it’s name from the Greek word.

High level Features of the App(details on the video):

1.	Polished UI with ReactJS front end using LeafletJS for maps D3 library for charts, and Slider package for Slide Shows. Easily allow integration with Word Press and is mobile friendly.
2.	 On page load, allows users location to be located via google services API.
3.	Uses the official colors and logo of the DOS.
4.	When map loads initially, all the diplomatic missions show up on the Map.
5.	Users have the ability to search by countries to narrow down pins on the map. Pins are clickable and display further data based on the consulate.
6.	Users have the ability to search by Language to display only mission pins where that language is supported.
7.	Users have the ability to color code the map based on Travel Advisory from DOS.
8.	Users have the ability to see the amount of funds being allocated to each country, and display countries with a bigger circle that have allocation of over 100 Million dollars.
9.	The right panel displays a history of all the missions opening over time.
10.	The right panel display a slide show of major events.
11.	Once user searches for a country, the bottom panel shows the attaché and the consulate information along with a brief description.
12.	The bottom panel also has a tab to display bi-lateral/multi-lateral funding based on the country searched, currently only shows Afghanistan data. 
13.	Finally, there is a twitter feed on the right panel.
14.	App  bootcampguru.github.io/diploun
15.	Source code  git@github.com:BootCampGuru/diploun.git

Future Deliverables:

1.	Integrate with APIs vs using static content.
2.	Create D3 funding maps for all countries.
3.	Allow users to add their feedback per embassy.
4.	Allow users to add dangerous conditions around embassies, basically crowd source some of the travel advisory data based on user location.
5.	Need an API just for events, so users can register.



Pain Points and Suggestions:
1.	Not enough APIs available online, most data had to be extracted from csv/excel file and converted to JSON.
2.	APIs that this app could benefit from are  Languages per consulate, Office hours, and embassy data, as well as API that brings back financial data in a JSON format. I also couldn’t find good images of the embassies.
3.	The hardest part was trying to find ways to combine the data into usable form, but most data had to be made static, better to be dynamic generated from APIs.
4.	The embassy website should create developers API, and this would provide a centralization location for all embassy related data.


References:

Embassies Data – provided and rest looked up, https://www.usembassy.gov/


TIP:(CRS Report):

https://www.state.gov/reports/2018-trafficking-in-persons-report/

https://fas.org/sgp/crs/row/R44953.pdf

World Wild Life Report:

https://www.unodc.org/unodc/en/data-and-analysis/wildlife.html

Travel Advisory:

https://www.travel-advisory.info/all-countries

Air Quality Index:

https://aqicn.org/
https://www.airnow.gov/international/us-embassies-and-consulates/


U.S. Foreign Aid:

https://explorer.usaid.gov/cd/AFG?fiscal_year=2019&implementing_agency_id=1&measure=Obligations
