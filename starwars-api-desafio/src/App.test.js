
import { useState, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json'

describe ('Stars Wars APP' , () => {
  beforeAll(() => jest.spyOn(window, "fetch"))
  it('Should show a list of characters including Luke Skywalker', () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument(); 
    
  });

  it("should show a list of characters from JSON file", async () => {
    render(<App />);
    for (let character of data.results){
      expect (screen.getByText(character.name)).toBeInTheDocument();
    }
  });

  it("should show a list of characters from the API", async () => {
      window.fetch.mockResolvedValueOnce({
        ok:true,
        json: async () => data,
      });
      render(<App />);
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/')

      for (let character of data.results) {
        expect(await screen.findByText(character.name)).toBeInTheDocument
      }
  });
}); 
