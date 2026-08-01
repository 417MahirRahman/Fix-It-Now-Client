import CategoryForm from "../_components/category-form";

export default function NewCategoryPage() {
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full sm:max-w-md">
        <CategoryForm />
      </div>
    </div>
  );
}
