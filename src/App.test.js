import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

describe('ProtectedRoute', () => {
  test('renders children when logged in', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedRoute loggedIn={true} element={<div>Protected Content</div>} />
      </MemoryRouter>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test('redirects to login when not logged in', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/cards']}>
        <ProtectedRoute loggedIn={false} element={<div>Protected Content</div>} />
      </MemoryRouter>
    );
    expect(container.innerHTML).not.toMatch(/Protected Content/i);
  });
});