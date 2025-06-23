import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/app/components/Header';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../src/app/context/LanguageContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/app/context/LanguageContext', () => ({
  useLanguage: jest.fn(),
}));

describe('Header redirections and interactions', () => {
  const pushMock = jest.fn();
  const setLangMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useLanguage as jest.Mock).mockReturnValue({
      lang: 'es',
      setLang: setLangMock,
    });
    pushMock.mockClear();
    setLangMock.mockClear();
  });

  it('redirige a "/" al hacer clic en el logo', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Farmacias y Asociados'));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('redirige a /medicamentos', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Buscar remedios'));
    expect(pushMock).toHaveBeenCalledWith('/medicamentos');
  });

  it('redirige a /frecuentes', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Mis medicamentos'));
    expect(pushMock).toHaveBeenCalledWith('/frecuentes');
  });

  it('redirige a /MedicinePriceChart', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Grafico precios'));
    expect(pushMock).toHaveBeenCalledWith('/MedicinePriceChart');
  });

  it('redirige a /login y elimina "session" del localStorage', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    render(<Header />);
    fireEvent.click(screen.getByText('Login'));
    expect(removeItemSpy).toHaveBeenCalledWith('session');
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('redirige a /notifications al hacer clic en la campana y resetea el contador', () => {
    render(<Header />);
    const bellButton = screen.getAllByRole('button').find(btn =>
      btn.innerHTML.includes('svg')
    );
    fireEvent.click(bellButton!);
    expect(pushMock).toHaveBeenCalledWith('/notifications');
  });

  it('cambia el idioma cuando se selecciona otro idioma', () => {
    render(<Header />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en' } });
    expect(setLangMock).toHaveBeenCalledWith('en');
  });

  it('abre el menú móvil al hacer clic en el botón ☰', () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText('Abrir menú');
    fireEvent.click(toggleButton);

    // Verifica que el segundo "Buscar remedios" sea visible tras abrir el menú
    const buttons = screen.getAllByText('Buscar remedios');
    expect(buttons[1]).toBeVisible();
  });

it('redirige desde el menú móvil a /medicamentos', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('Abrir menú'));
  const mobileButtons = screen.getAllByText('Buscar remedios');
  fireEvent.click(mobileButtons[1]); // El segundo es del menú móvil
  expect(pushMock).toHaveBeenCalledWith('/medicamentos');
});

it('redirige desde el menú móvil a /frecuentes', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('Abrir menú'));
  const mobileButtons = screen.getAllByText('Mis medicamentos');
  fireEvent.click(mobileButtons[1]);
  expect(pushMock).toHaveBeenCalledWith('/frecuentes');
});

it('redirige desde el menú móvil a /MedicinePriceChart', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('Abrir menú'));
  const mobileButtons = screen.getAllByText('Grafico precios');
  fireEvent.click(mobileButtons[1]);
  expect(pushMock).toHaveBeenCalledWith('/MedicinePriceChart');
});

it('redirige desde el menú móvil a /login', () => {
  const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
  render(<Header />);
  fireEvent.click(screen.getByLabelText('Abrir menú'));
  const mobileButtons = screen.getAllByText('Login');
  fireEvent.click(mobileButtons[1]);
  expect(removeItemSpy).toHaveBeenCalledWith('session');
  expect(pushMock).toHaveBeenCalledWith('/login');
});

});
