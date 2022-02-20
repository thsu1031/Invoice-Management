import React, { useState, useMemo, useRef, useEffect } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({ data, onSelect, customerName, customerNameSelect }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(-1);

  const searchContainer = useRef(null);
  const searchResultRef = useRef(null);

  useEffect(()=> {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollIntoView = position => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behavior: "smooth"
    });
  };

  useEffect(()=> {
    if(cursor < 0 || cursor > suggestions.length || !searchResultRef) {
      return () => {};
    }
    
    let listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop)

  }, [cursor]);
 
  const suggestions = useMemo(()=> {
    if(!search) return data;
    setCursor(-1);
    scrollIntoView(0);
    return data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) );

  }, [search, data])

  const handleClickOutside = event => {
    if(searchContainer.current && !searchContainer.current.contains(event.target)) {
      hideSuggestion();
    } 
  };

  const showSuggestion = () => setIsVisible(true);
  const hideSuggestion = () => setIsVisible(false);

  return (
    <div style={{height: "100%"}}  ref={searchContainer}>
      <input 
        type="text" 
        name="search"
        className="search-bar"
        autoComplete="off"
        value={ search || customerName}
        onClick={showSuggestion}
        onChange={e => setSearch(e.target.value)}
      />
      <div className={`search-result ${isVisible? "visible" : "invisible"}`}> 
        <ul className="list-group" ref={searchResultRef}>
          {
            suggestions.map((item, index) => (
              <AutoCompleteItem 
                key={item.id} 
                onSelectItem={()=> {
                  hideSuggestion();
                  setSearch(item.name);
                  onSelect(item);
                  customerNameSelect(item)
                }}
              {...item}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AutoComplete;