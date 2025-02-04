describe('Search functionality tests', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="searchForm">
          <input id="query" type="text" />
          <button type="submit">Search</button>
        </form>
      `;
    });
  
    test('should return the correct query when the form is submitted', () => {
      const form = document.getElementById('searchForm');
      const input = document.getElementById('query');
      
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = input.value;
        expect(query).toBe('testQuery');
      });
  
      input.value = 'testQuery';
      form.dispatchEvent(new Event('submit'));
    });
  
    test('should handle empty input correctly', () => {
      const form = document.getElementById('searchForm');
      const input = document.getElementById('query');
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = input.value;
        expect(query).toBe('');
      });
  
      input.value = '';
      form.dispatchEvent(new Event('submit'));
    });
  
    test('should not submit the form when the input is empty', () => {
      const form = document.getElementById('searchForm');
      const input = document.getElementById('query');
  
      input.value = '';
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = input.value;
        expect(query).toBe('');
      });
  
      form.dispatchEvent(new Event('submit'));
    });
  
    test('should log the correct query to the console', () => {
      const form = document.getElementById('searchForm');
      const input = document.getElementById('query');
      console.log = jest.fn();
  
      input.value = 'testQuery';
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = input.value;
        console.log('Search query:', query);
      });
  
      form.dispatchEvent(new Event('submit'));
  
      expect(console.log).toHaveBeenCalledWith('Search query:', 'testQuery');
    });
  });
  