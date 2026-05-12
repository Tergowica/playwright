import re
from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://kazeo.pl/")
    page.get_by_role("button", name="Continue with Recommended").click()
    page.locator("#menu-item-661").get_by_role("link", name="Współpraca").click()
    page.get_by_role("textbox", name="Nickname").fill("test")
    page.get_by_role("textbox", name="Adres e-mail").fill("test@test.pl")
    page.get_by_role("textbox", name="Komentarz lub wiadomość").fill("t")
    page.get_by_role("textbox", name="Komentarz lub wiadomość").fill("ttest")
    page.get_by_role("button", name="Prześlij").click()

    expect(page.get_by_text("Dziękujemy za kontakt! Wkrótce się odezwiemy.")).to_be_visible()
    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
