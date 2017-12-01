import {Model} from 'ringa';

export default class ArrayCollection extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    let onChange = {
      onChange: this.onChangeHandler.bind(this)
    };
    /**
     * Data is the input Array.
     */
    this.addProperty('data');

    /**
     *  Items is the:
     *
     *  1) Sorted
     *  2) Filtered
     *
     *  Final display items.
     */
    this.addProperty('items', undefined);

    this.addProperty('filterFunctions', []);
    this.addProperty('sortFunctions', []);
    this.addProperty('enablePagination', false, onChange);
    this.addProperty('page', 0, onChange);
    this.addProperty('pageSize', 10, onChange);
    this.addProperty('focusIndex', undefined, onChange);

    if (this.data) {
      this.update();
    }
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get canNext() {
    return this.page < this.lastPage;
  }

  get canPrev() {
    return this.page > 0;
  }

  get lastPage() {
    return this.data ? Math.ceil(this.filterCount / this.pageSize) - 1 : 0;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  update() {
    if (!this.data || !this.data.length) {
      this.items = [];
      return;
    }

    let final = this.data.concat();

    if (this.sortFunctions && this.sortFunctions.length) {
      this.sortFunctions.forEach(f => {
        final = final.sort(f);
      });
    }

    if (this.filterFunctions && this.filterFunctions.length) {
      let beforeCount = final.length;

      this.filterFunctions.forEach(f => {
        final = final.filter(f);
      });

      this.isFiltered = final.length !== beforeCount;
    } else {
      this.isFiltered = false;
    }

    this.filterCount = final.length;

    if (this.enablePagination) {
      let start = this.pageSize * this.page;

      final = final.slice(start, start + this.pageSize);
    }

    this._items = final;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onChangeHandler() {
    this.update();

    this.notify('items');
  }
}
