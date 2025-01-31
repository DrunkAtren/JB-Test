Do prawidłowego działania aplikacji należy miec najnowsza stabilną wersje Node.js
Testy zostały wykonane na wersji Node.js v22.13.0.

Do działania testów należy zainstalowac środowisko testowe o nazwie "Playwright" na języku "Typescript"
Wersja użyta do pisania i odpalania testów to Version 1.50.0
npm init playwright@latest
npm install @playwright/test

Do stworzenia raportów graficznych został użyty program Allure-Playwright
Podsumowanie testó zostało wykonane na wersji allure-playwright 3.0.9
npm install --save-dev @playwright/test allure-playwright

Do odpalenia Ui z testami należy użyc komendy
npx playwright test --ui

Do odpalenia testów in line aby stworzyc nowy raport wyników należy użyc komendy
npx playwright test    

Do wygenerowania raport w Allure należy użyc komendy 
allure serve allure-results