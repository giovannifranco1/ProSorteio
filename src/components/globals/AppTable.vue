<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >{{ column }}</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(person, personIdx) in people"
                :key="person.email"
                :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >{{ person.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      default: null
    }
  }
}
</script>