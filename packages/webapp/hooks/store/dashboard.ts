import { ref } from '@vue/composition-api';
import * as _uuid from 'uuid';

export interface PanelItem {
  uuid: string;
  type: 'panel';
  background?: string;
  flex?: number;
}

interface ContainerItem {
  uuid: string;
  type: 'container';
  rows: RowItem[];
  flex?: number;
}

export type ColItem = PanelItem | ContainerItem;

export interface RowItem {
  type: 'row';
  cols: ColItem[];
  flex?: number;
}

interface ContainerItemRaw {
  uuid: string;
  type: 'container';
  rows: {
    type: 'row';
    cols: string[];
    flex?: number;
  }[];
  flex?: number;
}

type ItemRaw = ContainerItemRaw | PanelItem;

const mock = () => {
  const rootId = _uuid.v4();
  const panelId = _uuid.v4();
  return {
    rootId,
    items: [
      {
        uuid: rootId,
        type: 'container',
        rows: [
          {
            type: 'row',
            cols: [panelId],
          },
        ],
      },
      {
        uuid: panelId,
        type: 'panel',
      },
    ] as ItemRaw[],
  };
};

const useDashboard = () => {
  const raw = mock();
  const items = new Map(raw.items.map((c) => [c.uuid, c]));

  const getContainer = (id: string): ColItem => {
    const item = items.get(id);
    if (!item) {
      const newItem: PanelItem = { uuid: _uuid.v4(), type: 'panel' };
      items.set(newItem.uuid, newItem);
      return newItem;
    }
    if (item.type === 'panel') {
      return item;
    }
    return {
      ...item,
      rows: item.rows.map((row) => ({
        ...row,
        cols: row.cols.map((col) => getContainer(col)),
      })),
    };
  };

  const root = ref(getContainer(raw.rootId));

  const createTwo = (uuid: string) => {
    const itemOne = {
      ...items.get(uuid),
      uuid: _uuid.v4(),
      type: 'panel',
      flex: undefined,
    } as PanelItem;
    const itemTwo = {
      uuid: _uuid.v4(),
      type: 'panel',
    } as PanelItem;
    items.set(itemOne.uuid, itemOne);
    items.set(itemTwo.uuid, itemTwo);
    return [itemOne, itemTwo] as const;
  };

  const divideRow = (uuid: string) => {
    const newItems = createTwo(uuid);
    items.set(uuid, {
      uuid,
      type: 'container',
      rows: [
        {
          type: 'row',
          cols: [newItems[0].uuid],
        },
        {
          type: 'row',
          cols: [newItems[1].uuid],
        },
      ],
    });
    root.value = getContainer(raw.rootId);
  };
  const divideCol = (uuid: string) => {
    const newItems = createTwo(uuid);
    items.set(uuid, {
      uuid,
      type: 'container',
      rows: [
        {
          type: 'row',
          cols: [newItems[0].uuid, newItems[1].uuid],
        },
      ],
    });
    root.value = getContainer(raw.rootId);
  };
  const rowSlider = (uuid: string, add: number) => {
    const item = items.get(uuid);
    if (!item || item.type === 'panel') {
      return;
    }
    const flex = (item.rows[0].flex || 6) + add;
    if (flex < 1) {
      const reverse = items.get(item.rows[1].cols[0]);
      items.delete(item.rows[0].cols[0]);
      items.delete(item.rows[1].cols[0]);
      items.set(uuid, { ...reverse, uuid, flex: undefined } as ItemRaw);
    } else if (flex > 11) {
      const reverse = items.get(item.rows[0].cols[0]);
      items.delete(item.rows[0].cols[0]);
      items.delete(item.rows[1].cols[0]);
      items.set(uuid, { ...reverse, uuid, flex: undefined } as ItemRaw);
    } else {
      item.rows[0].flex = flex;
      item.rows[1].flex = 12 - flex;
    }
    root.value = getContainer(raw.rootId);
  };
  const colSlider = (uuid: string, add: number) => {
    const item = items.get(uuid);
    if (!item || item.type === 'panel') {
      return;
    }
    const [col1, col2] = item.rows[0].cols.map((ci) => items.get(ci));
    const flex = (col1 && col1.flex ? col1.flex : 6) + add;
    if (flex < 1) {
      col1 && items.delete(col1.uuid);
      col2 && items.delete(col2.uuid);
      items.set(uuid, { ...col2, uuid, flex: undefined } as ItemRaw);
    } else if (flex > 11) {
      col1 && items.delete(col1.uuid);
      col2 && items.delete(col2.uuid);
      items.set(uuid, { ...col1, uuid, flex: undefined } as ItemRaw);
    } else {
      col1 && (col1.flex = flex);
      col2 && (col2.flex = 12 - flex);
    }
    root.value = getContainer(raw.rootId);
  };
  const setPanel = (uuid: string, panel: PanelItem) => {
    const oldPanel = items.get(uuid);
    if (oldPanel && oldPanel.type === 'panel') {
      items.set(uuid, panel);
      root.value = getContainer(raw.rootId);
    }
  };
  const removePanel = (uuid: string, ri: number, ci: number) => {
    const item = items.get(uuid);
    if (!item || item.type === 'panel') {
      return;
    }
    if (uuid === raw.rootId) {
      return;
    }
    items.delete(item.rows[ri].cols[ci]);
    item.rows[ri].cols.splice(ci, 1);
    if (item.rows[ri].cols.length === 0) {
      item.rows.splice(ri, 1);
    }
    if (item.rows.length === 1 && item.rows[0].cols.length === 1) {
      const panel = items.get(item.rows[0].cols[0]);
      if (panel) {
        items.delete(panel.uuid);
        items.set(uuid, {
          ...panel,
          uuid,
          flex: item.flex,
        } as ItemRaw);
      }
    }
    root.value = getContainer(raw.rootId);
  };
  return {
    root,
    divideRow,
    divideCol,
    rowSlider,
    colSlider,
    setPanel,
    removePanel,
  };
};

export default useDashboard;
