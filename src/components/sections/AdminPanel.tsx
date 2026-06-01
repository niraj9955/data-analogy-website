"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Save,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { iconNames } from "@/lib/icons";
import type {
  InitData,
  SiteConfigData,
  ServiceData,
  PillarData,
  IndustryData,
  BlogData,
  NavLinkData,
  ContactData,
} from "@/lib/types";

// ─── ADMIN PANEL ────────────────────────────────────────────────────────────

export function AdminPanel({
  open,
  onClose,
  data,
  onRefresh,
}: {
  open: boolean;
  onClose: () => void;
  data: InitData;
  onRefresh: () => void;
}) {
  const [activeTab, setActiveTab] = useState("site-config");

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden"
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="flex items-center gap-2">
            <Settings size={20} />
            Admin Panel
          </SheetTitle>
        </SheetHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="px-4 pt-2">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="site-config" className="text-xs">
                Site Config
              </TabsTrigger>
              <TabsTrigger value="services" className="text-xs">
                Services
              </TabsTrigger>
              <TabsTrigger value="pillars" className="text-xs">
                Pillars
              </TabsTrigger>
              <TabsTrigger value="industries" className="text-xs">
                Industries
              </TabsTrigger>
              <TabsTrigger value="blogs" className="text-xs">
                Blogs
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs">
                Messages
              </TabsTrigger>
              <TabsTrigger value="navigation" className="text-xs">
                Navigation
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
            <div className="p-4">
              <TabsContent value="site-config" className="mt-0">
                <SiteConfigTab
                  siteConfig={data.siteConfig}
                  onRefresh={onRefresh}
                />
              </TabsContent>

              <TabsContent value="services" className="mt-0">
                <CrudTab<ServiceData>
                  title="Services"
                  items={data.services}
                  apiBase="/api/services"
                  onRefresh={onRefresh}
                  renderForm={(item, onChange) => (
                    <ServiceForm item={item} onChange={onChange} />
                  )}
                  renderLabel={(item) => item.title}
                  fields={["title", "desc", "icon", "color", "bgColor", "order"]}
                />
              </TabsContent>

              <TabsContent value="pillars" className="mt-0">
                <CrudTab<PillarData>
                  title="Pillars"
                  items={data.pillars}
                  apiBase="/api/pillars"
                  onRefresh={onRefresh}
                  renderForm={(item, onChange) => (
                    <PillarForm item={item} onChange={onChange} />
                  )}
                  renderLabel={(item) => item.title}
                  fields={["title", "desc", "icon", "gradient", "accentColor", "image", "order"]}
                />
              </TabsContent>

              <TabsContent value="industries" className="mt-0">
                <CrudTab<IndustryData>
                  title="Industries"
                  items={data.industries}
                  apiBase="/api/industries"
                  onRefresh={onRefresh}
                  renderForm={(item, onChange) => (
                    <IndustryForm item={item} onChange={onChange} />
                  )}
                  renderLabel={(item) => item.name}
                  fields={["name", "icon", "desc", "image", "order"]}
                />
              </TabsContent>

              <TabsContent value="blogs" className="mt-0">
                <CrudTab<BlogData>
                  title="Blogs"
                  items={data.blogs}
                  apiBase="/api/blogs"
                  onRefresh={onRefresh}
                  renderForm={(item, onChange) => (
                    <BlogForm item={item} onChange={onChange} />
                  )}
                  renderLabel={(item) => item.title}
                  fields={["title", "excerpt", "category", "author", "image", "published"]}
                />
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <MessagesTab />
              </TabsContent>

              <TabsContent value="navigation" className="mt-0">
                <CrudTab<NavLinkData>
                  title="Nav Links"
                  items={data.navLinks}
                  apiBase="/api/nav-links"
                  onRefresh={onRefresh}
                  renderForm={(item, onChange) => (
                    <NavLinkForm item={item} onChange={onChange} />
                  )}
                  renderLabel={(item) => item.label}
                  fields={["label", "href", "order"]}
                />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

// ─── SITE CONFIG TAB ────────────────────────────────────────────────────────

function SiteConfigTab({
  siteConfig,
  onRefresh,
}: {
  siteConfig: SiteConfigData;
  onRefresh: () => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm({
      companyName: siteConfig.companyName,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      heroTitle: siteConfig.heroTitle,
      heroHighlight: siteConfig.heroHighlight,
      heroSubtitle: siteConfig.heroSubtitle,
      heroBadge: siteConfig.heroBadge,
      heroBackground: siteConfig.heroBackground,
      stat1Value: siteConfig.stat1Value,
      stat1Label: siteConfig.stat1Label,
      stat2Value: siteConfig.stat2Value,
      stat2Label: siteConfig.stat2Label,
      stat3Value: siteConfig.stat3Value,
      stat3Label: siteConfig.stat3Label,
      aboutTitle: siteConfig.aboutTitle,
      aboutText1: siteConfig.aboutText1,
      aboutText2: siteConfig.aboutText2,
      whatWeDoTitle: siteConfig.whatWeDoTitle,
      whatWeDoItems: siteConfig.whatWeDoItems,
      whatWeDoClosing: siteConfig.whatWeDoClosing,
      whyUsTitle: siteConfig.whyUsTitle,
      whyUsSubtitle: siteConfig.whyUsSubtitle,
      ctaTitle: siteConfig.ctaTitle,
      ctaSubtitle: siteConfig.ctaSubtitle,
      ctaButtonText: siteConfig.ctaButtonText,
      email: siteConfig.email,
      phone: siteConfig.phone,
      address: siteConfig.address,
      footerTagline: siteConfig.footerTagline,
      primaryColor: siteConfig.primaryColor,
    });
  }, [siteConfig]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        onRefresh();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save site config:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fieldGroups = [
    {
      label: "Company",
      fields: [
        { key: "companyName", label: "Company Name", type: "input" },
        { key: "tagline", label: "Tagline", type: "input" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "primaryColor", label: "Primary Color", type: "input" },
      ],
    },
    {
      label: "Hero",
      fields: [
        { key: "heroTitle", label: "Hero Title", type: "input" },
        { key: "heroHighlight", label: "Hero Highlight", type: "input" },
        { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
        { key: "heroBadge", label: "Hero Badge", type: "input" },
        { key: "heroBackground", label: "Hero Background Image", type: "input" },
      ],
    },
    {
      label: "Stats",
      fields: [
        { key: "stat1Value", label: "Stat 1 Value", type: "input" },
        { key: "stat1Label", label: "Stat 1 Label", type: "input" },
        { key: "stat2Value", label: "Stat 2 Value", type: "input" },
        { key: "stat2Label", label: "Stat 2 Label", type: "input" },
        { key: "stat3Value", label: "Stat 3 Value", type: "input" },
        { key: "stat3Label", label: "Stat 3 Label", type: "input" },
      ],
    },
    {
      label: "About",
      fields: [
        { key: "aboutTitle", label: "About Title", type: "input" },
        { key: "aboutText1", label: "About Text 1", type: "textarea" },
        { key: "aboutText2", label: "About Text 2", type: "textarea" },
        { key: "whatWeDoTitle", label: "What We Do Title", type: "input" },
        {
          key: "whatWeDoItems",
          label: "What We Do Items (separated by |)",
          type: "textarea",
        },
        { key: "whatWeDoClosing", label: "What We Do Closing", type: "input" },
      ],
    },
    {
      label: "Why Us / CTA",
      fields: [
        { key: "whyUsTitle", label: "Why Us Title", type: "input" },
        { key: "whyUsSubtitle", label: "Why Us Subtitle", type: "textarea" },
        { key: "ctaTitle", label: "CTA Title", type: "input" },
        { key: "ctaSubtitle", label: "CTA Subtitle", type: "textarea" },
        { key: "ctaButtonText", label: "CTA Button Text", type: "input" },
      ],
    },
    {
      label: "Contact / Footer",
      fields: [
        { key: "email", label: "Email", type: "input" },
        { key: "phone", label: "Phone", type: "input" },
        { key: "address", label: "Address", type: "input" },
        { key: "footerTagline", label: "Footer Tagline", type: "textarea" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {fieldGroups.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {group.label}
          </h3>
          <div className="space-y-3">
            {group.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={form[field.key] ?? ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                ) : (
                  <Input
                    value={form[field.key] ?? ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="text-sm"
                  />
                )}
              </div>
            ))}
          </div>
          <Separator className="mt-4" />
        </div>
      ))}

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={16} />
            Saving...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2" size={16} />
            Saved!
          </>
        ) : (
          <>
            <Save className="mr-2" size={16} />
            Save Site Config
          </>
        )}
      </Button>
    </div>
  );
}

// ─── GENERIC CRUD TAB ───────────────────────────────────────────────────────

interface CrudItem {
  id: string;
  [key: string]: unknown;
}

function CrudTab<T extends CrudItem>({
  title,
  items,
  apiBase,
  onRefresh,
  renderForm,
  renderLabel,
  fields: _fields,
}: {
  title: string;
  items: T[];
  apiBase: string;
  onRefresh: () => void;
  renderForm: (
    item: Partial<T>,
    onChange: (key: string, value: string) => void
  ) => React.ReactNode;
  renderLabel: (item: T) => string;
  fields: string[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({});
  };

  const startEdit = (item: T) => {
    setEditing(item.id);
    setAdding(false);
    const obj: Record<string, string> = {};
    _fields.forEach((f) => {
      const val = item[f];
      obj[f] = val instanceof Date ? val.toISOString() : String(val ?? "");
    });
    setForm(obj);
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
    setForm({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {};
      _fields.forEach((f) => {
        const val = form[f];
        if (f === "order" || f === "published") {
          payload[f] = val === "true" || val === "1";
        } else if (f === "order") {
          payload[f] = parseInt(val) || 0;
        } else {
          payload[f] = val;
        }
      });

      let res: Response;
      if (adding) {
        res = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (editing) {
        res = await fetch(`${apiBase}/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        return;
      }

      if (res.ok) {
        cancel();
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          {title} ({items.length})
        </h3>
        <Button
          size="sm"
          onClick={startAdd}
          className="bg-cyan-600 hover:bg-cyan-700 text-white h-8"
        >
          <Plus size={14} className="mr-1" />
          Add New
        </Button>
      </div>

      {(adding || editing) && (
        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              {adding ? "Add New Item" : "Edit Item"}
            </h4>
            {renderForm(form as Partial<T>, onChange)}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <Save size={14} className="mr-1" />
                )}
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-800 truncate mr-2">
              {renderLabel(item)}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => startEdit(item)}
                disabled={editing === item.id}
              >
                <Pencil size={14} className="text-gray-500" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
              >
                {deleting === item.id ? (
                  <Loader2 className="animate-spin text-red-500" size={14} />
                ) : (
                  <Trash2 size={14} className="text-red-500" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          No items found. Click &quot;Add New&quot; to create one.
        </p>
      )}
    </div>
  );
}

// ─── FORM COMPONENTS ────────────────────────────────────────────────────────

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function ServiceForm({
  item,
  onChange,
}: {
  item: Partial<ServiceData>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <FormField label="Title">
        <Input
          value={(item.title as string) ?? ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Service title"
          className="text-sm"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={(item.desc as string) ?? ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Service description"
          rows={3}
          className="text-sm"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Icon">
          <Input
            value={(item.icon as string) ?? ""}
            onChange={(e) => onChange("icon", e.target.value)}
            placeholder="e.g. Database"
            className="text-sm"
          />
        </FormField>
        <FormField label="Order">
          <Input
            value={(item.order as string) ?? "0"}
            onChange={(e) => onChange("order", e.target.value)}
            type="number"
            className="text-sm"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Color (e.g. text-cyan-600)">
          <Input
            value={(item.color as string) ?? ""}
            onChange={(e) => onChange("color", e.target.value)}
            className="text-sm"
          />
        </FormField>
        <FormField label="Background (e.g. bg-cyan-50)">
          <Input
            value={(item.bgColor as string) ?? ""}
            onChange={(e) => onChange("bgColor", e.target.value)}
            className="text-sm"
          />
        </FormField>
      </div>
      <p className="text-xs text-gray-400">
        Available icons: {iconNames.slice(0, 15).join(", ")}, ...
      </p>
    </div>
  );
}

function PillarForm({
  item,
  onChange,
}: {
  item: Partial<PillarData>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <FormField label="Title">
        <Input
          value={(item.title as string) ?? ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Pillar title"
          className="text-sm"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={(item.desc as string) ?? ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Pillar description"
          rows={3}
          className="text-sm"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Icon">
          <Input
            value={(item.icon as string) ?? ""}
            onChange={(e) => onChange("icon", e.target.value)}
            placeholder="e.g. Target"
            className="text-sm"
          />
        </FormField>
        <FormField label="Order">
          <Input
            value={(item.order as string) ?? "0"}
            onChange={(e) => onChange("order", e.target.value)}
            type="number"
            className="text-sm"
          />
        </FormField>
      </div>
      <FormField label="Gradient (e.g. from-red-500 to-red-700)">
        <Input
          value={(item.gradient as string) ?? ""}
          onChange={(e) => onChange("gradient", e.target.value)}
          className="text-sm"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Accent Color">
          <Input
            value={(item.accentColor as string) ?? ""}
            onChange={(e) => onChange("accentColor", e.target.value)}
            className="text-sm"
          />
        </FormField>
        <FormField label="Image Path">
          <Input
            value={(item.image as string) ?? ""}
            onChange={(e) => onChange("image", e.target.value)}
            placeholder="/pillars/image.png"
            className="text-sm"
          />
        </FormField>
      </div>
    </div>
  );
}

function IndustryForm({
  item,
  onChange,
}: {
  item: Partial<IndustryData>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <FormField label="Name">
        <Input
          value={(item.name as string) ?? ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Industry name"
          className="text-sm"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={(item.desc as string) ?? ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Industry description"
          rows={2}
          className="text-sm"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Icon">
          <Input
            value={(item.icon as string) ?? ""}
            onChange={(e) => onChange("icon", e.target.value)}
            placeholder="e.g. Factory"
            className="text-sm"
          />
        </FormField>
        <FormField label="Order">
          <Input
            value={(item.order as string) ?? "0"}
            onChange={(e) => onChange("order", e.target.value)}
            type="number"
            className="text-sm"
          />
        </FormField>
      </div>
      <FormField label="Image Path">
        <Input
          value={(item.image as string) ?? ""}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="/industries/image.png"
          className="text-sm"
        />
      </FormField>
    </div>
  );
}

function BlogForm({
  item,
  onChange,
}: {
  item: Partial<BlogData>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <FormField label="Title">
        <Input
          value={(item.title as string) ?? ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Blog title"
          className="text-sm"
        />
      </FormField>
      <FormField label="Excerpt">
        <Textarea
          value={(item.excerpt as string) ?? ""}
          onChange={(e) => onChange("excerpt", e.target.value)}
          placeholder="Blog excerpt"
          rows={2}
          className="text-sm"
        />
      </FormField>
      <FormField label="Content">
        <Textarea
          value={(item.content as string) ?? ""}
          onChange={(e) => onChange("content", e.target.value)}
          placeholder="Full blog content"
          rows={4}
          className="text-sm"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Category">
          <Input
            value={(item.category as string) ?? ""}
            onChange={(e) => onChange("category", e.target.value)}
            placeholder="e.g. Technology"
            className="text-sm"
          />
        </FormField>
        <FormField label="Author">
          <Input
            value={(item.author as string) ?? ""}
            onChange={(e) => onChange("author", e.target.value)}
            placeholder="Author name"
            className="text-sm"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Image Path">
          <Input
            value={(item.image as string) ?? ""}
            onChange={(e) => onChange("image", e.target.value)}
            placeholder="/blogs/image.png"
            className="text-sm"
          />
        </FormField>
        <FormField label="Published">
          <Input
            value={(item.published as string) ?? "true"}
            onChange={(e) => onChange("published", e.target.value)}
            placeholder="true or false"
            className="text-sm"
          />
        </FormField>
      </div>
    </div>
  );
}

function NavLinkForm({
  item,
  onChange,
}: {
  item: Partial<NavLinkData>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <FormField label="Label">
        <Input
          value={(item.label as string) ?? ""}
          onChange={(e) => onChange("label", e.target.value)}
          placeholder="Link label"
          className="text-sm"
        />
      </FormField>
      <FormField label="URL / Href">
        <Input
          value={(item.href as string) ?? ""}
          onChange={(e) => onChange("href", e.target.value)}
          placeholder="#section or /page"
          className="text-sm"
        />
      </FormField>
      <FormField label="Order">
        <Input
          value={(item.order as string) ?? "0"}
          onChange={(e) => onChange("order", e.target.value)}
          type="number"
          className="text-sm"
        />
      </FormField>
    </div>
  );
}

// ─── MESSAGES TAB ───────────────────────────────────────────────────────────

function MessagesTab() {
  const [messages, setMessages] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-400 text-sm">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">
        Contact Messages ({messages.length})
      </h3>
      {messages.map((msg) => (
        <Card key={msg.id} className="border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{msg.name}</p>
                <p className="text-xs text-gray-500">{msg.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {msg.read ? (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                    Read
                  </Badge>
                ) : (
                  <Badge className="text-xs bg-cyan-600 text-white">New</Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
