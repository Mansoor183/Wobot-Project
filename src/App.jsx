import './App.css'
import ImgComponent from './components/ImgComponent'
import SecondoryItemsComponent from './components/SecondoryItemsComponent'
import TableComponent from './components/TableComponent'
import { FilterProvider } from './Contexts/FilterContext'
import { SearchProvider } from './Contexts/SearchContext'

function App() {
  return (
    <div style={{ backgroundColor: '#F9F9F9'}}>
      <SearchProvider>
        <FilterProvider>
          <div style={{marginLeft: '2%', marginRight: '2%'}}>
            <ImgComponent/>
            <SecondoryItemsComponent/>
            <TableComponent/>
          </div>
        </FilterProvider>
      </SearchProvider>
    </div>
  )
}

export default App
