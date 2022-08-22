import {
  InputText,
  InteractionResponseType,
  MessageComponentTypes,
  TextStyleTypes,
} from 'discord-interactions';

interface DiscordComponent {
  type: MessageComponentTypes;
}

export class ModalBuilder {
  public readonly type = InteractionResponseType.APPLICATION_MODAL;

  private data: {
    title: string;
    custom_id: string;
    components: DiscordComponent[];
  };

  constructor() {
    this.data = {
      title: '',
      custom_id: '',
      components: [],
    };
  }

  setTitle(title: string) {
    this.data.title = title;
    return this;
  }

  setCustomId(custom_id: string) {
    this.data.custom_id = custom_id;
    return this;
  }

  addComponent(component: DiscordComponent) {
    this.data.components.push(component);
    return this;
  }
}

export class DropdownItem implements DiscordComponent {
  public readonly type = MessageComponentTypes.STRING_SELECT;
  private label: string = '';
  private value: string = '';
  private description?: string;
  private emoji?: {
    name?: string;
    id?: string;
  };

  constructor() {}

  setLabel(label: string) {
    this.label = label;
    return this;
  }

  setValue(value: string) {
    this.value = value;
    return this;
  }
}

class DropdownMenu implements DiscordComponent {
  public type = MessageComponentTypes.STRING_SELECT;
  public custom_id: string = '';
  public options: DropdownItem[] = [];
  public min_value: number = 0;
  public max_value: number = 1;
  public placeholder?: string = '';
}

export class DropdownBuilder implements DiscordComponent {
  public readonly type = MessageComponentTypes.ACTION_ROW;
  private components: DropdownMenu[];

  constructor() {
    this.components = [new DropdownMenu()];
  }

  setCustomId(id: string) {
    this.components[0].custom_id = id;
    return this;
  }

  addOption(item: DropdownItem) {
    this.components[0].options.push(item);
    return this;
  }

  setMinValue(val: number) {
    this.components[0].min_value = val;
    return this;
  }

  setMaxValue(val: number) {
    this.components[0].max_value = val;
    return this;
  }

  setPlaceholder(str: string) {
    this.components[0].placeholder = str;
    return this;
  }
}

export class TextInputBuilder implements DiscordComponent {
  public readonly type = MessageComponentTypes.ACTION_ROW;
  private components: InputText[];

  constructor() {
    this.components = [
      {
        type: MessageComponentTypes.INPUT_TEXT,
        style: TextStyleTypes.SHORT,
      } as InputText,
    ];
  }

  setCustomId(id: string) {
    this.components[0]['custom_id'] = id;
    return this;
  }

  setLabel(label: string) {
    this.components[0]['label'] = label;
    return this;
  }

  setStyle(style: TextStyleTypes) {
    this.components[0]['style'] = style;
    return this;
  }

  setMinLength(min: number) {
    this.components[0]['min_length'] = min;
    return this;
  }

  setMaxLength(max: number) {
    this.components[0]['max_length'] = max;
    return this;
  }

  setRequired(required: boolean) {
    this.components[0]['required'] = required;
    return this;
  }

  setValue(value: string) {
    this.components[0]['value'] = value;
    return this;
  }

  setPlaceholder(placeholder: string) {
    this.components[0]['placeholder'] = placeholder;
    return this;
  }
}
