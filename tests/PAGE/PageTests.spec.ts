import { test, expect } from '@playwright/test';

test('Test funkcjonalności Zaloguj | Wyloguj', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); 
  await page.getByRole('link', { name: 'user' }).click();
  await page.getByRole('link', { name: 'Wyloguj' }).click();
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
});

test('Test funkcjonalności Paska Bocznego', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); 
  await page.getByRole('link', { name: '' }).click();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).not.toBeVisible();
  await page.getByRole('link', { name: '' }).click();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Projekty' }).click();
  await expect (page.getByRole('columnheader', { name: 'Identyfikator' })).toBeVisible(); 
  await page.getByRole('link', { name: ' Zamówienia' }).click();
  await expect (page.getByRole('cell', { name: 'Id' })).toBeVisible(); 
  await page.getByRole('link', { name: ' Raporty' }).click();
  await Promise.all([
    expect(page.getByRole('link', { name: ' Raport rodzaju działalności', exact: true })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Raport rodzaju działalności wg. Projektu' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Raport według rodzaju kosztu' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Niezrealizowane zamówienia' })).toBeVisible(),
  ])
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await Promise.all([
    expect(page.getByRole('link', { name: ' Rodzaje kosztów' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Pracownicy' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Rodzaje działalności' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Autorzy' })).toBeVisible(),
  ])
});

test('Test funkcjonalności Paska Bocznego w zakładce "Raporty"', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('link', { name: ' Raporty' }).click();
  await Promise.all([
    expect(page.getByRole('link', { name: ' Raport rodzaju działalności', exact: true })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Raport rodzaju działalności wg. Projektu' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Raport według rodzaju kosztu' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Niezrealizowane zamówienia' })).toBeVisible(),
  ])
  await page.getByRole('link', { name: ' Raport rodzaju działalności', exact: true }).click();
  await expect(page.getByRole('link', { name: ' Raporty' })).toBeVisible();
  await page.getByRole('link', { name: ' Raport rodzaju działalności wg. Projektu' }).click();
  await expect(page.getByRole('link', { name: ' Raport rodzaju działalności wg. Projektu' })).toBeVisible();
  await page.getByRole('link', { name: ' Raport według rodzaju kosztu' }).click();
  await expect(page.getByRole('link', { name: 'Raport według rodzaju kosztu' })).toBeVisible();
  await page.getByRole('link', { name: ' Niezrealizowane zamówienia' }).click();
  await expect(page.getByRole('link', { name: ' Niezrealizowane zamówienia' })).toBeVisible();
  
  await page.waitForTimeout(5000);
});

test('Test funkcjonalności Paska Bocznego w zakładce "Ustawienia"', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await Promise.all([
    expect(page.getByRole('link', { name: ' Rodzaje kosztów' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Pracownicy' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Rodzaje działalności' })).toBeVisible(),
    expect(page.getByRole('link', { name: ' Autorzy' })).toBeVisible(),
  ])
  await page.getByRole('link', { name: ' Rodzaje kosztów' }).click();
  await expect(page.getByRole('heading', { name: 'Rodzaje kosztów' })).toBeVisible();
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await page.getByRole('link', { name: ' Pracownicy' }).click();
  await expect(page.getByRole('heading', { name: 'Pracownicy' })).toBeVisible();
  // await page.getByRole('link', { name: ' Ustawienia' }).click();
  await page.getByRole('link', { name: ' Rodzaje działalności' }).click();
  await expect(page.getByRole('heading', { name: 'Rodzaje działalności' })).toBeVisible();
  await page.getByRole('link', { name: ' Autorzy' }).click();
  await expect(page.getByRole('heading', { name: 'Rafał Wojszczyk' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Adrian Kuczyński' })).toBeVisible();
  await page.waitForTimeout(5000);
});

test('Test funkcjonalności Dodawania Projektu', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Projekty' }).click();
  await page.getByRole('button', { name: '+ Dodaj' }).click();
  await page.getByRole('textbox', { name: 'Identyfikator *' }).fill("400")
  await page.getByRole('textbox', { name: 'Nazwa *' }).fill("TestDodawaniaProjektu2")
  await page.getByRole('button', { name: 'Rodzaj działalności' }).click();
  await page.getByRole('button', { name: '- Badania własne' }).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).fill("Rafał")
  await expect(page.getByRole('option', { name: 'Rafał Wojszczyk' })).toBeVisible();
  await page.getByRole('option', { name: 'Rafał Wojszczyk' }).click();
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.getByRole('cell', { name: 'TestDodawaniaProjektu2' })).toBeVisible();
});

test('Test funkcjonalności Dodawania Zamówień ', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Zamówienia' }).click();
  await page.getByRole('button', { name: '+ Dodaj' }).click();
  await page.locator('input[name="wirka"]').fill("2222")
  await page.getByRole('button', { name: 'Wybierz projekt' }).click();
  await page.getByRole('button', { name: '- ProjektDoTestów' }).click();
  await page.getByRole('button', { name: '- Usługi' }).click();
  await page.getByRole('button', { name: '- Amortyzacja' }).click();
  await page.getByRole('spinbutton').fill("3000");
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('16', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Opis' }).fill("TestDodawaniaZamówień")
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.getByRole('cell', { name: 'TestDodawaniaZamówień' })).toBeVisible();
});

test('Test funkcjonalności Dodawania Rodzajów Kosztów', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await page.getByRole('link', { name: ' Rodzaje kosztów' }).click();
  await expect(page.getByRole('heading', { name: 'Rodzaje kosztów' })).toBeVisible();
  await page.getByRole('button', { name: '+ Dodaj' }).click();
  await page.locator('input[name="identifier"]').fill("500")
  await page.getByRole('textbox', { name: 'Nazwa' }).fill("TestowaKategoria")
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.getByText('- TestowaKategoria')).toBeVisible();
});

test('Test funkcjonalności Dodawania | Usuwania Pracowników', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await page.getByRole('link', { name: ' Pracownicy' }).click();
  await expect(page.getByRole('heading', { name: 'Pracownicy' })).toBeVisible();
  await page.getByRole('button', { name: '+ Dodaj' }).click();
  await page.getByRole('textbox', { name: 'Imię *' }).fill("Test");
  await page.getByRole('textbox', { name: 'Nazwisko *' }).fill("Pracownika")
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await page.getByRole('link', { name: '2' }).click();
  await expect(page.getByRole('cell', { name: 'Test' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Pracownika' })).toBeVisible();
  await page.getByRole('row', { name: 'Test Pracownika ' }).locator('i').nth(1).click();
  await page.getByRole('button', { name: 'Tak' }).click();
});

test('Test funkcjonalności Dodawania Rodzaju Działalności', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepageFinanse WEiI' })).toBeVisible();
  await page.getByRole('link', { name: ' Ustawienia' }).click();
  await page.getByRole('link', { name: ' Rodzaje działalności' }).click();
  await expect(page.getByRole('heading', { name: 'Rodzaje działalności' })).toBeVisible();
  await page.getByRole('button', { name: '+ Dodaj' }).click();
  await page.getByRole('spinbutton', { name: 'Identifikator *' }).fill("600");
  await page.getByRole('textbox', { name: 'Nazwa *' }).fill("TestowaDziałalność")
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.getByRole('cell', { name: 'TestowaDziałalność' })).toBeVisible();
});

test('Test funkcjonalności Filtrowania po Roku', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible(); 
  await page.getByRole('textbox', { name: 'Nazwa użytk. lub mail' }).fill('admin'); 
  await page.getByRole('textbox', { name: 'Hasło' }).fill('123qwe');
  await page.getByRole('button', { name: 'Wybierz wydział' }).click();
  await page.getByRole('button', { name: 'WEiI' }).click();
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible(); 
  await page.getByRole('link', { name: ' Projekty' }).click();
  await page.getByRole('link', { name: ' Zamówienia' }).click();
  await expect (page.getByText('ZamówienieDoTestu2025')).toBeVisible(); 
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '2023' }).click();
  await expect (page.getByText('ZamówienieDoTestu2023')).toBeVisible(); 
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '2022' }).click();
  await expect (page.getByText('ZamówienieDoTestu2022')).toBeVisible(); 
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '2021' }).click();
  await expect (page.getByText('ZamówienieDoTestu2021')).toBeVisible(); 
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '2020' }).click();
  await expect (page.getByText('ZamówienieDoTestu2020')).toBeVisible(); 
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '2019' }).click();
  await expect (page.getByText('ZamówienieDoTestu2019')).toBeVisible(); 
});